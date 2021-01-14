const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const Post = require('./models/Post');
const User = require('./models/User');
const { MONGODB } = require('./config');

const typeDefs = gql`
  #setup queryes and what they return
  type Post {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
  }
  type Query {
    getPosts: [Post]
  }
`;

const resolvers = {
  Query: {
    getPosts: async () => {
      try {
        const posts = await Post.find(); // finds all
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
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
    console.log('MongoDB connected');
    server.listen({ port: 5000 }).then((res) => {
      console.log(`server up and runnning at ${res.url}`);
    });
  });
