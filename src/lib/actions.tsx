'use server'

import { createAI, createStreamableUI } from 'ai/rsc'
import { nanoid } from 'nanoid'
import { AIState, UIState } from '@/types'
import { searchBrave } from './search'
import { SearchResultsWithLink } from '@/components/SearchResults'
import { summarize } from './summarize'
import { SkeletonGrid } from '@/components/SkeletonGrid'
import { openai } from '@ai-sdk/openai'
import { z } from 'zod'
import { streamText } from 'ai'
import { Weather } from '@/components/Weather'
import { getForecastWeather } from './weather'
import { SkeletonCard } from '@/components/SkeletonCard'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export const maxDuration = 25 // This function can run for a maximum of 5 seconds
export const dynamic = 'force-dynamic'

async function searchAction(input: string) {
  'use server'
  try {
    const searchUI = createStreamableUI(<SkeletonGrid />)

    const answerUI = createStreamableUI(<SkeletonCard />)

    ;(async () => {
      const searchResponse = await searchBrave(input)
      const webResults = searchResponse.web.results
      searchUI.done(<SearchResultsWithLink searchResults={webResults} />)
      const result = await streamText({
        model: openai('gpt-3.5-turbo'),
        messages: [{ role: 'user', content: input }],

        tools: {
          getAnswer: {
            description:
              'Get an answer to a question from analysing the web results.',
            parameters: z.object({
              query: z.string().describe('The question to get an answer for.')
            }),
            execute: async ({ query }) => {
              const summarizeResponseStream = await summarize(query, webResults)

              const chunks = []
              for await (const chunk of summarizeResponseStream) {
                if (chunk.answer) {
                  chunks.push(chunk.answer)

                  answerUI.update(
                    <Markdown remarkPlugins={[remarkGfm]}>
                      {chunks.join('')}
                    </Markdown>
                  )
                }
              }
            }
          },
          showWeather: {
            description:
              'Get the weather for a location. Example: "What is the weather in San Francisco?"',
            parameters: z.object({
              location: z
                .string()
                .describe('The location to get the weather for.'),
              unit: z
                .enum(['C', 'F'])
                .describe('The unit to get the weather in.')
            })
          }
        }
      })

      for await (const delta of result.fullStream) {
        const { type } = delta
        if (type === 'text-delta') {
          const { textDelta } = delta
        } else if (type === 'tool-call') {
          const { toolName, args } = delta
          if (toolName === 'showWeather') {
            const { location, unit } = args
            const weather = await getForecastWeather({ city: location, unit })
            answerUI.update(
              <Weather city={location} unit={unit} weather={weather} />
            )
          }
        }
      }
      answerUI.done()
    })()
    return {
      id: nanoid(),
      display: searchUI.value,
      type: 'search',
      answerUI: answerUI.value
    }
  } catch (error) {
    console.error(error)
  }
}

export const AI = createAI<AIState, UIState>({
  actions: {
    searchAction
  },
  initialUIState: [],
  initialAIState: { chatId: nanoid(), interactions: [], messages: [] }
})
