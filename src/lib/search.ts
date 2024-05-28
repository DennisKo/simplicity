export const search = async (query: string) => {
  const searchResponse = await fetch(
    `https://api.search.brave.com/res/v1/web/search?q=${query}&count=3&safesearch=moderate&result_filter=web`,
    {
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip",
        "X-Subscription-Token": process.env.BRAVE_API_KEY,
      },
    }
  );
  const searchResults = await searchResponse.json();
  return searchResults;
};
