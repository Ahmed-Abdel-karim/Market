const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  email: String,
  token: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 43200
  }
});

const Token = mongoose.model("token", TokenSchema);

module.exports = Token;
