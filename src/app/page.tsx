import { nanoid } from 'nanoid'
import { AI } from '../lib/actions'
import { Chat } from '@/components/Chat'

export default function Home() {
  const id = nanoid()

  return (
    <AI initialAIState={{ chatId: id, interactions: [], messages: [] }}>
      <Chat id={id} />
    </AI>
  )
}
