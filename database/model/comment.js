const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  content: String,
  createdAt: Date
});

const Comment = mongoose.model("comment", CommentSchema);
CommentSchema.pre("save", function() {
  this.createdAt = Date.now();
});
module.exports = Comment;
