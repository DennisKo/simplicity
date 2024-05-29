import Link from 'next/link'

export const SearchResultsWithLink = ({ searchResults }) => {
  return (
    <div className="">
      <div className="grid grid-cols-2 gap-4">
        {searchResults?.map(result => (
          <Link href={result.url} key={result.url} target="_blank">
            <div className="flex flex-col gap-3 p-3 rounded-md bg-gray-100 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-center gap-2">
                {result.meta_url?.favicon && (
                  <img
                    alt="Favicon"
                    className="w-5 h-5"
                    height={20}
                    src={result.meta_url.favicon}
                    style={{
                      aspectRatio: '20/20',
                      objectFit: 'cover'
                    }}
                    width={20}
                  />
                )}
                <h3 className="text-sm font-semibold line-clamp-1">
                  {result.title}
                </h3>
              </div>
              <div
                className="text-sm text-gray-500 overflow-hidden line-clamp-2"
                dangerouslySetInnerHTML={{ __html: result.description }}
              ></div>
              <div className="text-xs text-gray-500 font-semibold line-clamp-1 -mt-1">
                {result.profile.name}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

// {
//     title: 'r/explainlikeimfive on Reddit: ELI5 - How do batteries work?',
//     url: 'https://www.reddit.com/r/explainlikeimfive/comments/tystvn/eli5_how_do_batteries_work/',
//     is_source_local: false,
//     is_source_both: false,
//     description: 'New comments cannot be posted and votes cannot be cast. Share ... A battery has three main parts: <strong>an anode (the negative, electron-rich terminal), a cathode (the positive, electron-deficient terminal), and an electrolyte that allows positively charged ions to flow</strong>.',
//     page_age: '2022-04-08T02:07:16',
//     profile: {
//       name: 'Reddit',
//       url: 'https://www.reddit.com/r/explainlikeimfive/comments/tystvn/eli5_how_do_batteries_work/',
//       long_name: 'reddit.com',
//       img: 'https://imgs.search.brave.com/mAZYEK9Wi13WLDUge7XZ8YuDTwm6DP6gBjvz1GdYZVY/rs:fit:32:32:1/g:ce/aHR0cDovL2Zhdmlj/b25zLnNlYXJjaC5i/cmF2ZS5jb20vaWNv/bnMvN2ZiNTU0M2Nj/MTFhZjRiYWViZDlk/MjJiMjBjMzFjMDRk/Y2IzYWI0MGI0MjVk/OGY5NzQzOGQ5NzQ5/NWJhMWI0NC93d3cu/cmVkZGl0LmNvbS8'
//     },
//     language: 'en',
//     family_friendly: true,
//     type: 'search_result',
//     subtype: 'qa',
//     meta_url: {
//       scheme: 'https',
//       netloc: 'reddit.com',
//       hostname: 'www.reddit.com',
//       favicon: 'https://imgs.search.brave.com/mAZYEK9Wi13WLDUge7XZ8YuDTwm6DP6gBjvz1GdYZVY/rs:fit:32:32:1/g:ce/aHR0cDovL2Zhdmlj/b25zLnNlYXJjaC5i/cmF2ZS5jb20vaWNv/bnMvN2ZiNTU0M2Nj/MTFhZjRiYWViZDlk/MjJiMjBjMzFjMDRk/Y2IzYWI0MGI0MjVk/OGY5NzQzOGQ5NzQ5/NWJhMWI0NC93d3cu/cmVkZGl0LmNvbS8',
//       path: '  › r/explainlikeimfive  › eli5 - how do batteries work?'
//     },
//     thumbnail: {
//       src: 'https://imgs.search.brave.com/0Uws9Xair0pH-I24v67ryQNS-DH6a6I5j6ziUvKsgfg/rs:fit:200:200:1/g:ce/aHR0cHM6Ly93d3cu/cmVkZGl0c3RhdGlj/LmNvbS9pY29uLnBu/Zw',
//       original: 'https://www.redditstatic.com/icon.png',
//       logo: false
//     },
//     age: 'April 8, 2022'
//   }
