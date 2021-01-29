const { AuthenticationError, UserInputError } = require("apollo-server");
const { paginateResults } = require("../../utils/pagination");

const Post = require("../../models/Post");
const User = require("../../models/User");
const checkAuth = require("../../utils/checkAuth");

module.exports = {
  Query: {
    //GET ALL POSTS
    posts: async (_, { pageSize = 10, after }) => {
      try {
        const allPosts = await Post.find().sort({ createdAt: -1 }); // finds all
        const posts = paginateResults({
          after,
          pageSize,
          results: allPosts,
        });
        return {
          posts,
          cursor: posts.length ? posts[posts.length - 1].cursor : null,
          // if the cursor of the end of the paginated results is the same as the
          // last item in _all_ results, then there are no more results after this
          hasMore: posts.length
            ? posts[posts.length - 1].cursor !==
              allPosts[allPosts.length - 1].cursor
            : false,
        };
      } catch (err) {
        throw new Error(err);
      }
    },
    //GET ONE POST
    post: async (_, { postId }) => {
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
    searchPosts: async (_, { search }) => {
      try {
        const posts = await Post.find();
        const filteredPosts = posts.filter(
          (post) =>
            post.title.toLowerCase().includes(search) ||
            post.category.toLowerCase().includes(search)
        );
        return filteredPosts;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    // CREATE NEW POST
    createPost: async (
      _,
      {
        createInput: {
          title,
          prepTime,
          imageUrl,
          videoUrl,
          description,
          ingredients,
          prepSteps,
          notes,
          category,
        },
      },
      context
    ) => {
      const user = checkAuth(context);
      const newPost = new Post({
        title,
        prepTime,
        imageUrl,
        videoUrl,
        description,
        ingredients,
        prepSteps,
        category,
        favCount: 0,
        notes,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
        cursor: new Date().getTime(),
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
    likePost: async (_, { postId }, context) => {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);
      if (post) {
        if (post.likes.find((like) => like.username === username)) {
          // Post already liked => unlike it
          post.likes = post.likes.filter((like) => like.username !== username);
        } else {
          // Not liked => like post
          post.likes.push({
            username: username,
            createdAt: new Date().toISOString(),
          });
        }

        await post.save();
        return post;
      } else throw new UserInputError("Post not found");
    },
    //EDIT POST
    editPost: async (_, { postId, editInput }, context) => {
      const user = checkAuth(context);
      try {
        const post = await Post.findById(postId);
        if (user.username === post.username) {
          Object.keys(editInput).forEach(
            (value) => (post[value] = editInput[value])
          );
          await post.save();
          return post;
        } else {
          throw new AuthenticationError("Action forbiden");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    addToFavorites: async (_, { postId }, context) => {
      const logedInuser = checkAuth(context);

      try {
        const post = await Post.findById(postId);
        const user = await User.findById(logedInuser.id);

        if (post) {
          user.favorites.push(postId);
          await user.save();
          post.favCount += 1;
          await post.save();
          return post;
        } else {
          throw new AuthenticationError("Action forbiden");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
