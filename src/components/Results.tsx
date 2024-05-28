import { Message, UIState } from '@/types'
import { SearchInput } from '@/components/SearchInput'

export const Results = ({ messages }: { messages: UIState }) => {
  return (
    <div className="flex flex-col gap-y-6">
      {messages.map(message => (
        <AssistantMessage key={message.id} message={message} />
      ))}
    </div>
  )
}

const AssistantMessage = ({ message }) => {
  console.log('AssistantMessage', message)
  return (
    <div className="text-secondary-foreground  rounded-lg">
      {message.display}
      {message.spinner}
    </div>
  )
}

const UserMessage = ({ message }: { message: Message }) => {
  const search = () => {}
  return (
    <div className="text-2xl mb-4 text-slate-700">
      <SearchInput search={search} query={message.display} />
    </div>
  )
}
