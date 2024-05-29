import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Search } from 'lucide-react'
import { Button } from './ui/button'

export const SearchInput = ({ search }) => {
  const [input, setInput] = useState<string>('')
  const handleEnterSubmit = event => {
    if (event.key === 'Enter') {
      search(input.trim())
    }
  }

  const handleInput = event => {
    setInput(event.target.value)
  }

  const exampleQueries = [
    'What is the weather in New York?',
    'What can we do to stop climate change?',
    'Can dogs eat chocolate?',
    'What is the height of Mount Everest?'
  ]

  const onExampleClick = query => {
    setInput(query)
    search(query)
  }

  return (
    <div className="w-full relative">
      <Input
        className="text-lg mb-4"
        type="text"
        placeholder="Search anything"
        onChange={handleInput}
        onKeyDown={handleEnterSubmit}
      />
      <div className="pointer-events-none absolute top-3 right-0 flex items-center pr-3">
        <Search color="#94a3b8" size={20} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {exampleQueries.map(query => (
          <Button
            key={query}
            className="flex-1"
            variant="outline"
            onClick={() => onExampleClick(query)}
          >
            {query}
          </Button>
        ))}
      </div>
    </div>
  )
}
