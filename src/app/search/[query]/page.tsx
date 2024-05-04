import { Results } from '@/components/Results';
import { continueConversation } from './actions';
import { Suspense } from 'react';

export default async function SearchPage({
  params,
}: {
  params: { query: string };
}) {
  const query = decodeURIComponent(params.query);

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Results query={query} />
      </Suspense>
    </div>
  );
}
