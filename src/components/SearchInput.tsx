import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Search } from 'lucide-react'

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
  return (
    <div className="w-full relative">
      <Input
        className="text-lg"
        type="text"
        placeholder="Search anything"
        onChange={handleInput}
        onKeyDown={handleEnterSubmit}
      />
      <div className="pointer-events-none absolute top-3 right-0 flex items-center pr-3">
        <Search color="#94a3b8" size={20} />
      </div>
    </div>
  )
}
