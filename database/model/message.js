const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  content: String,
  date: Date,
  conversation: {
    type: Schema.Types.ObjectId,
    ref: "conversation"
  },
  seen: {
    type: Boolean,
    default: false
  }
});

MessageSchema.pre("save", function() {
  this.date = Date.now();
});

const Message = mongoose.model("message", MessageSchema);
module.exports = Message;
