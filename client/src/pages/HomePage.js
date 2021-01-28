import React from "react";
import { useQuery } from "@apollo/client";

import { GET_POSTS } from "../graphQL/Queries";

const HomePage = () => {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log(data);

  return (
    <div>
      {data.posts.map(({ title, id }) => (
        <h1 key={id}>{title}</h1>
      ))}
    </div>
  );
};

export default HomePage;
