const gql = require("graphql-tag");

module.exports = gql`
  #setup queries and what they return

  type User {
    id: ID!
    username: String!
    email: String!
    token: String!
    createdAt: String!
  }
  type Post {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
    comments: [Comment]!
    likes: [Like]!
  }
  type Like {
    id: ID!
    username: String!
    createdAt: String!
  }
  type Comment {
    id: ID!
    username: String!
    body: String!
    createdAt: String!
    commentLikes: [CommentLike]!
  }
  type CommentLike {
    id: ID!
    username: String!
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  input EditInput {
    body: String!
  }
  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
  }

  type Mutation {
    register(registerInput: RegisterInput): User! #This mutation returns type user
    login(username: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    likePost(postId: ID!): Post!
    editPost(postId: ID!, editInput: EditInput): Post!
    createComment(postId: String!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likeComment(postId: ID!, commentId: ID!): Post!
    editComment(postId: ID!, commentId: ID!, body: String!): Post!
  }
`;
