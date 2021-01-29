import React from "react";
import { ApolloClient, ApolloProvider, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { cache } from "./cache";

import App from "./App";

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      console.log(
        `Graphql error ${message} location: ${location} path: ${path}`
      );
      return "error";
    });
  }
  if (networkError) {
    console.log("networkError", networkError);
  }
});

const link = from([errorLink, new HttpLink({ uri: "http://localhost:5000" })]);

const client = new ApolloClient({
  cache: cache,
  link: link,
});
const MyApolloProvider = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

export default MyApolloProvider;
