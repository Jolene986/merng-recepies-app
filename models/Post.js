const { model, Schema } = require("mongoose");

const postSchema = new Schema({
  title: String,
  prepTime: String,
  imageUrl: String,
  description: String,
  ingredients: [String],
  prepSteps: [String],
  category: String,
  username: String,
  createdAt: String,
  favCount: Number,
  comments: [
    {
      body: String,
      username: String,
      createdAt: String,
      commentLikes: [
        {
          username: String,
          createdAt: String,
        },
      ],
    },
  ],
  likes: [
    {
      username: String,
      createdAt: String,
    },
  ],
  user: {
    //posts rel with the user
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = model("Post", postSchema);
