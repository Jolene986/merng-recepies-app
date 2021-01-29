const { model, Schema } = require("mongoose");

const postSchema = new Schema({
  title: String,
  prepTime: String,
  imageUrl: String,
  videoUrl: String,
  description: String,
  ingredients: [String],
  prepSteps: [String],
  category: String,
  notes: String,
  username: String,
  createdAt: String,
  favCount: Number,
  cursor: String,
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
