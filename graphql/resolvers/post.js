const Post = require("../../models/Post");
const checkAuth = require("../../utils/checkAuth");

module.exports = {
  Query: {
    //GET ALL POSTS
    getPosts: async () => {
      try {
        const posts = await Post.find(); // finds all
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
      console.log(user);
      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });
      const post = await newPost.save();
      return post;
    },
  },
};
