'use client'

import { AI } from '@/lib/actions'
import { Results } from '@/components/Results'
import { SearchInput } from '@/components/SearchInput'
import { useActions, useUIState } from 'ai/rsc'

export const Chat = ({ id }: { id: string }) => {
  const [messages, setMessages] = useUIState<typeof AI>()
  const { continueConversation } = useActions()

  const search = async (query: string) => {
    setMessages(currentConversation => [
      ...currentConversation,
      { id, role: 'user', display: query }
    ])

    const message = await continueConversation(query)

    setMessages(currentConversation => [...currentConversation, message])
  }
  return (
    <div className="max-w-2xl mx-auto p-6">
      {messages.length === 0 ? (
        <div className="pt-20  flex justify-center items-center">
          <SearchInput search={search} />
        </div>
      ) : (
        <Results messages={messages} />
      )}
    </div>
  )
}
