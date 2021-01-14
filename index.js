const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const mongoose = require("mongoose");

const { MONGODB } = require("./config");

const typeDefs = gql`
  #setup queryes and what they return
  type Query {
    sayHi: String!
  }
`;

const resolvers = {
  Query: {
    sayHi: () => "helo everyone",
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    server.listen({ port: 5000 }).then((res) => {
      console.log(`server up and runnning at ${res.url}`);
    });
  });
