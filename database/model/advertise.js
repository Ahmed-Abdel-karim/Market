const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const imageQuery = require("../query/images/index");
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

const AdvertiseSchema = new Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  category: {
    type: String
  },
  brand: String,
  price: { type: Number },
  email: {
    type: String
  },
  phone_number: String,
  country: { type: String },
  region: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "comment"
    }
  ],
  gallery: [
    {
      type: String
    }
  ],
  createdAt: Date,
  location: PointSchema,
  address: String,
  tags: {
    type: [String]
  }
});

AdvertiseSchema.pre("remove", function(next) {
  const Comment = mongoose.model("comment");
  Comment.remove({ _id: { $in: this.comments } }).then(() => next());
  const User = mongoose.model("user");
});
AdvertiseSchema.index(
  {
    title: "text",
    description: "text",
    brand: "text",
    tags: "text"
  },
  {
    name: "search index",
    weights: {
      title: 10,
      description: 5,
      brand: 8,
      tags: 10
    }
  }
);

const Advertise = mongoose.model("advertise", AdvertiseSchema);
module.exports = Advertise;
