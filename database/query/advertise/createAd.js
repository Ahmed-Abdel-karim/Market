const User = require("../../model/user");
const Message = require("../../model/message");
const Advertise = require("../../model/advertise");
const Comment = require("../../model/comment");
const Conversatio = require("../../model/conversation");
const createAdQuery = (user, params, images) => {
  const newAd = new Advertise({
    title: params.title,
    price: params.price,
    description: params.description,
    category: params.category,
    email: params.email,
    phone_number: params.phone_number,
    brand: params.brand,
    address: params.address,
    location: {
      type: "Point",
      coordinates: params.location
    },
    tags: params.tags,
    country: params.country,
    region: params.region,
    createdAt: Date.now()
  });
  user.advertises.push(newAd);
  newAd.user = user;
  images.forEach(img => {
    newAd.gallery.push(img.id);
  });
  return Promise.all([user.save(), newAd.save()]);
};

module.exports = createAdQuery;
