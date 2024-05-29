'use client'

import { AI } from '@/lib/actions'
import { SearchInput } from '@/components/SearchInput'
import { readStreamableValue, useActions, useUIState } from 'ai/rsc'
import { useState } from 'react'
import { StreamableTextUI } from './StreamableTextUI'
import { Layers, Lightbulb } from 'lucide-react'
import { Skeleton } from './ui/skeleton'
import { SkeletonGrid } from './SkeletonGrid'

export const Chat = ({ id }: { id: string }) => {
  const [ui, setUI] = useUIState<typeof AI>()
  const { searchAction } = useActions()
  const [isSearching, setIsSearching] = useState(false)
  const search = async (query: string) => {
    setIsSearching(true)

    const results = await searchAction(query)
    setUI(currentUI => ({ ...currentUI, ...results }))
  }
  console.log('ui', ui.answerUI)
  return (
    <div className="max-w-3xl mx-auto p-6">
      {!isSearching ? (
        <div className="pt-20  flex justify-center items-center">
          <SearchInput search={search} />
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-y-6">
            <h2 className="flex items-center gap-2 font-bold text-xl text-gray-700">
              <Layers />
              Sources
            </h2>
            {ui.display}

            <h2 className="flex items-center gap-2 font-bold text-xl text-gray-700">
              <Lightbulb />
              Answer
            </h2>
            <div>{ui.answerUI}</div>
          </div>
        </>
      )}
    </div>
  )
}
