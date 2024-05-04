'use client';

import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const SearchInput = ({}) => {
  const [input, setInput] = useState<string>('');
  const router = useRouter();
  const handleEnterSubmit = (event) => {
    if (event.key === 'Enter') {
      router.push(`/search/${encodeURIComponent(input.trim())}`);
    }
  };

  const handleInput = (event) => {
    setInput(event.target.value);
  };
  return (
    <div className="w-full relative">
      <Input
        type="text"
        placeholder="Search anything"
        onChange={handleInput}
        onKeyDown={handleEnterSubmit}
      />
      <div className="pointer-events-none absolute top-2 right-0 flex items-center pr-3">
        <Search color="#94a3b8" size={20} />
      </div>
    </div>
  );
};
