const postResolvers = require("./post");
const userResolvers = require("./user");
const commentResolvers = require("./comments");

module.exports = {
  Query: {
    ...postResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postResolvers.Mutation,
    ...commentResolvers.Mutation,
  },
};
