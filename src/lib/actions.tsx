import 'server-only'
import {
  createAI,
  createStreamableUI,
  createStreamableValue,
  getAIState,
  getMutableAIState,
  streamUI
} from 'ai/rsc'
import { openai } from '@ai-sdk/openai'
import { z } from 'zod'
import { nanoid } from 'nanoid'
import { AIState, Chat, Message, UIState } from '@/types'
import { Weather } from '@/components/Weather'
import { Content } from '@/components/Content'
import { getForecastWeather } from '@/lib/weather'
import { SpinnerMessage } from '@/components/ui/spinner'
import { UserMessage } from '@/components/UserMessage'

async function continueConversation(input: string) {
  'use server'
  const aiState = getMutableAIState()
  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: nanoid(),
        role: 'user',
        content: `${aiState.get().interactions.join('\n\n')}\n\n${input}`
      }
    ]
  })

  // const textStream = createStreamableValue('')
  // const spinnerStream = createStreamableUI(<SpinnerMessage />)
  // const messageStream = createStreamableUI(null)
  // const uiStream = createStreamableUI()

  // ;(async () => {
  try {
    const result = await streamUI({
      model: openai.chat('gpt-3.5-turbo'),
      temperature: 0,
      tools: {
        showWeather: {
          description: 'Show the weather for a location',
          parameters: z.object({
            city: z.string().describe('The city to get the weather for'),
            unit: z
              .enum(['C', 'F'])
              .describe('The unit to display the temperature in')
          }),
          generate: async function ({ city, unit }) {
            const weather = await getForecastWeather({ city, unit })
            aiState.done(history => ({
              ...history,
              messages: [
                ...history.messages,
                {
                  role: 'assistant',
                  content: `weather in ${city} is ${weather.current.temp} ${unit}`
                }
              ]
            }))
            return <Weather city={city} unit={unit} weather={weather} />
          }
        }
      },
      messages: aiState.get().messages.map((message: Message) => ({
        role: message.role,
        content: message.content
      })),
      text: ({ content, done }) => {
        console.log('text')
        if (done) {
          aiState.done(history => ({
            ...history,
            messages: [
              ...history.messages,
              {
                role: 'assistant',
                content
              }
            ]
          }))
        }

        return <Content content={content} />
      }
    })

    // for await (const delta of result.fullStream) {
    //   const { type } = delta

    //   if (type === 'text-delta') {
    //     const { textDelta } = delta

    //     textContent += textDelta
    //     messageStream.update(<Content content={textContent} />)

    //     aiState.update({
    //       ...aiState.get(),
    //       messages: [
    //         ...aiState.get().messages,
    //         {
    //           id: nanoid(),
    //           role: 'assistant',
    //           content: textContent
    //         }
    //       ]
    //     })
    //   } else if (type === 'tool-call') {
    //     const { toolName, args } = delta

    //     if (toolName === 'showWeather') {
    //       const { city, unit } = args
    //       const weather = await getForecastWeather({ city, unit })
    //       uiStream.update(
    //         <Weather city={city} unit={unit} weather={weather} />
    //       )

    //       aiState.done({
    //         ...aiState.get(),
    //         interactions: [],
    //         messages: [
    //           ...aiState.get().messages,
    //           {
    //             id: nanoid(),
    //             role: 'assistant',
    //             content: `Heres the weather in ${city}`,
    //             display: {
    //               name: 'showWeather',
    //               props: {
    //                 city,
    //                 unit
    //               }
    //             }
    //           }
    //         ]
    //       })
    //     }
    //   }
    // }
    console.log('result', result.rawCall.rawSettings.tools)
    return {
      id: nanoid(),
      display: result.value
    }
  } catch (error) {
    console.error(error)
  }
}

export const AI = createAI<AIState, UIState>({
  actions: {
    continueConversation
  },
  initialUIState: [],
  initialAIState: { chatId: nanoid(), interactions: [], messages: [] }
  // onGetUIState: async () => {
  //   'use server'

  //   const aiState = getAIState()

  //   if (aiState) {
  //     const uiState = getUIStateFromAIState(aiState)
  //     return uiState
  //   }
  // }
})

// export const getUIStateFromAIState = (aiState: Chat) => {
//   return aiState.messages
//     .filter(message => message.role !== 'system')
//     .map((message, index) => ({
//       id: `${aiState.chatId}-${index}`,
//       display:
//         message.role === 'assistant' ? (
//           message.display?.name === 'getWeather' ? (
//             <Weather
//               unit={message.display.props.unit}
//               city={message.display.props.city}
//               weather={message.display.props.weather}
//             />
//           ) : (
//             <Content content={message.content} />
//           )
//         ) : message.role === 'user' ? (
//           <UserMessage>{message.content}</UserMessage>
//         ) : (
//           <Content content={message.content} />
//         )
//     }))
// }
