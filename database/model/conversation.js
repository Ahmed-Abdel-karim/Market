const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: "user"
    }
  ],
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: "message"
    }
  ],
  updatedAt: Date
});

ConversationSchema.pre("save", function() {
  this.updatedAt = Date.now();
});

const Conversation = mongoose.model("conversation", ConversationSchema);
module.exports = Conversation;
