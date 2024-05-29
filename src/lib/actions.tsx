'use server'

import {
  createAI,
  createStreamableUI,
  createStreamableValue,
  getMutableAIState
} from 'ai/rsc'
import { nanoid } from 'nanoid'
import { AIState, UIState } from '@/types'
import { searchBrave } from './search'
import { SearchResultsWithLink } from '@/components/SearchResults'
import { summarize } from './summarize'
import { SkeletonCard } from '@/components/SkeletonCard'

async function searchAction(input: string) {
  'use server'
  try {
    const searchUI = createStreamableUI(<SkeletonCard />)
    const streamableStatus = createStreamableValue('Loading...')

    ;(async () => {
      const searchResponse = await searchBrave(input)
      const webResults = searchResponse.web.results

      searchUI.done(<SearchResultsWithLink searchResults={webResults} />)
      const summarizeResponseStream = await summarize(input, webResults)
      const chunks = []
      for await (const chunk of summarizeResponseStream) {
        if (chunk.answer) {
          chunks.push(chunk.answer)
          streamableStatus.update(chunks.join(''))
        }
      }
      streamableStatus.done()
    })()
    return {
      id: nanoid(),
      display: searchUI.value,
      type: 'search',
      text: streamableStatus.value
    }
  } catch (error) {
    console.error(error)
  }
}

export const summarizeAction = async (input: string, webResults) => {
  'use server'
  try {
    const streamableStatus = createStreamableValue('')
    console.log('summarizeAction', webResults)
    const summarizeResponseStream = await summarize(input, webResults)

    ;(async () => {
      const chunks = []
      for await (const chunk of summarizeResponseStream) {
        if (chunk.answer) {
          chunks.push(chunk.answer)
          streamableStatus.update(chunks.join(''))
        }
      }
      streamableStatus.done()
    })()
    return { display: streamableStatus.value }
  } catch (error) {
    console.error(error)
  }
}

export const AI = createAI<AIState, UIState>({
  actions: {
    searchAction,
    summarizeAction
  },
  initialUIState: [],
  initialAIState: { chatId: nanoid(), interactions: [], messages: [] }
})
