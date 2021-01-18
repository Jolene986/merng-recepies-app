const { AuthenticationError } = require("apollo-server");

const Post = require("../../models/Post");
const checkAuth = require("../../utils/checkAuth");

module.exports = {
  Query: {
    //GET ALL POSTS
    getPosts: async () => {
      try {
        const posts = await Post.find().sort({ createdAt: -1 }); // finds all
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    //GET ONE POST
    getPost: async (_, { postId }) => {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    // CREATE NEW POST
    createPost: async (_, { body }, context) => {
      const user = checkAuth(context);
      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });
      const post = await newPost.save();
      return post;
    },
    //DELETE POST
    deletePost: async (_, { postId }, context) => {
      const user = checkAuth(context);
      try {
        const post = await Post.findById(postId);
        if (user.username === post.username) {
          await post.delete();
          return "Post deleted successfully";
        } else {
          throw new AuthenticationError("Action forbiden");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
