export const SearchResults = ({ searchResults }) => {
  return (
    <div>
      {searchResults.map((result) => (
        <div key={result.url}>{result.title}</div>
      ))}
    </div>
  );
};

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
