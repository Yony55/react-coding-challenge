import { useEffect, useState } from 'react';
import UserPost from './components/UserPost.jsx';
import { useInfiniteQuery } from 'react-query';
import SkeletonPost from './components/SkeletonPost.jsx';

function App() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(
    ['catFacts'],
    async ({ pageParam = 1 }) => {
      const response = await fetch(`https://catfact.ninja/facts?page=${pageParam}`);
      const data = await response.json();
      return data;
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.current_page < lastPage.last_page) {
          return lastPage.current_page + 1;
        }
        return undefined;
      },
    }
  );

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (status === 'loading') {
    return (
      <div className="feed">
        {[...Array(10)].map((_, index) => (
          <SkeletonPost key={index}/>
        ))}
      </div>
    );
  }

  if (status === 'error') return <div>Sorry for the inconvenience, we are currently unable to load this post.</div>;

  return (
    <>
      <h1 className="head_text purple_gradient text-center">
        Cat Facts
      </h1>
      <div className="feed">
        {data.pages.map((page, pageIndex) =>
          page.data.map((fact, index) => (
            <UserPost key={`${pageIndex}-${index}`} catFact={fact.fact} />
          ))
        )}
        {isFetchingNextPage ? <div><SkeletonPost/></div> : null}
        {!hasNextPage && <div>No more posts available</div>}
      </div>
    </>
  );
}

export default App;
