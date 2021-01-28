import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

import "./App.css";
import HomePage from "./pages/HomePage";

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
  cache: new InMemoryCache(),
  link: link,
});
function App() {
  return (
    <ApolloProvider client={client}>
      <HomePage />
    </ApolloProvider>
  );
}

export default App;
