const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("email-validator");
const PointSchema = new Schema({
  type: {
    type: String,
    default: "Point"
  },
  coordinates: {
    type: [Number],
    index: "2dsphere"
  }
});

const UserSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    validate: {
      validator: email => validator.validate(email),
      message: "Email is not valid"
    }
  },
  password: String,
  isVerified: { type: Boolean, default: false },
  location: PointSchema,
  job: String,
  address: String,
  region: String,
  country: String,
  gender: String,
  ads: [
    {
      type: Schema.Types.ObjectId,
      ref: "advertise"
    }
  ],
  favAds: [
    {
      type: Schema.Types.ObjectId,
      ref: "advertise"
    }
  ],
  phone_number: String,
  email: String,
  avatar: String,
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: "message"
    }
  ]
});

const User = mongoose.model("user", UserSchema);
module.exports = User;
