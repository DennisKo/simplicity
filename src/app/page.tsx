import { SearchInput } from '@/components/SearchInput';
import { slugify } from '@/lib/utils';

import { redirect } from 'next/navigation';

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto ">
      <div className="min-h-screen flex justify-center items-center">
        <SearchInput />
      </div>
    </div>
  );
}
