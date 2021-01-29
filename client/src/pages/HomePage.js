import React, { useState } from "react";
import { useQuery } from "@apollo/client";

import { GET_POSTS } from "../graphQL/Queries";

const HomePage = () => {
  const { loading, error, data, fetchMore } = useQuery(GET_POSTS);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log(data.posts.cursor);
  return (
    <>
      <div>
        {data.posts &&
          data.posts.posts &&
          data.posts.posts.map(({ title, id }) => <h1 key={id}>{title}</h1>)}
      </div>
      {data.posts &&
        data.posts.hasMore &&
        (isLoadingMore ? (
          <p>loading....</p>
        ) : (
          <button
            onClick={async () => {
              setIsLoadingMore(true);
              await fetchMore({
                variables: {
                  after: data.posts.cursor,
                },
              });

              setIsLoadingMore(false);
            }}
          >
            Load More
          </button>
        ))}
    </>
  );
};

export default HomePage;
