const { AuthenticationError, UserInputError } = require("apollo-server");

const Post = require("../../models/Post");
const checkAuth = require("../../utils/checkAuth");

module.exports = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const { username } = checkAuth(context);
      if (body.trim() === "") {
        throw new UserInputError("Empty comment", {
          errors: {
            body: "Comment body must not be empty",
          },
        });
      }
      const post = await Post.findById(postId);
      if (post) {
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
        });
        await post.save();
        return post;
      } else throw new UserInputError("Post not found");
    },
    deleteComment: async (_, { postId, commentId }, context) => {
      const { username } = checkAuth(context);
      const post = await Post.findById(postId);
      if (post) {
        const commentIdx = post.comments.findIndex((c) => c.id === commentId);
        if (post.comments[commentIdx].username === username) {
          post.comments.splice(commentIdx, 1);
          await post.save();
          return post;
        } else {
          throw new AuthenticationError("Action forbiden");
        }
      } else {
        throw new UserInputError("Post not found");
      }
    },
    likeComment: async (_, { postId, commentId }, context) => {
      const { username } = checkAuth(context);
      const post = await Post.findById(postId);
      const comment = post.comments.find((comment) => comment.id === commentId);

      if (comment) {
        if (comment.commentLikes.find((like) => like.username === username)) {
          // Comment already liked => unlike it
          comment.commentLikes = comment.commentLikes.filter(
            (like) => like.username !== username
          );
        } else {
          //Comment not liked => like it
          comment.commentLikes.push({
            username: username,
            createdAt: new Date().toISOString(),
          });
        }
        await post.save();
        return post;
      } else throw new UserInputError("Comment not found");
    },
  },
};
