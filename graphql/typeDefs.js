const gql = require("graphql-tag");

module.exports = gql`
  #setup queries and what they return

  type User {
    id: ID!
    username: String!
    email: String!
    token: String!
    createdAt: String!
    posts: [Post]!
    favorites: [Post]!
  }
  type Post {
    id: ID!
    title: String!
    prepTime: String!
    imageUrl: String!
    description: String!
    ingredients: [String]!
    prepSteps: [String]!
    category: String!
    username: String!
    createdAt: String!
    cursor: String!
    comments: [Comment]!
    ratings: [Rating]!
    favCount: Int!
  }
  type Rating {
    id: ID!
    value: Int!
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
  input CreateInput {
    title: String!
    prepTime: String!
    imageUrl: String!
    videoUrl: String!
    description: String!
    ingredients: [String]!
    prepSteps: [String]!
    category: String!
    notes: String!
  }
  input EditInput {
    title: String
    prepTime: String
    imageUrl: String
    videoUrl: String
    description: String
    ingredients: [String]
    prepSteps: [String]
    category: String
    notes: String
  }
  type Query {
    #posts: [Post]
    posts(
      """
      The number of results to show. Must be >= 1. Default = 20
      """
      pageSize: Int
      """
      If you add a cursor here, it will only return results _after_ this cursor
      """
      after: String
    ): PostConnection!
    post(postId: ID!): Post!
    user(userId: ID!): User!
    searchPosts(search: String): [Post]
  }
  type PostConnection {
    cursor: String!
    hasMore: Boolean!
    posts: [Post]!
  }

  type Mutation {
    register(registerInput: RegisterInput): User! #This mutation returns type user
    login(username: String!, password: String!): User!
    createPost(createInput: CreateInput): Post!
    deletePost(postId: ID!): String!
    ratePost(postId: ID!, value: Int!): Post!
    editPost(postId: ID!, editInput: EditInput!): Post!
    createComment(postId: String!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likeComment(postId: ID!, commentId: ID!): Post!
    editComment(postId: ID!, commentId: ID!, body: String!): Post!
    addToFavorites(postId: ID!): Post!
  }
`;
