const Ad = require("../../model/ad");
const User = require("../../model/user");
const findAdQuery = require("./findAds");

const favAd = (user, _id) => {
  return findAdQuery(null, _id)
    .then(ad => {
      const ads = user.favAds.map(e => {
        return e.toString();
      });
      if (!ads.includes(ad._id.toString())) {
        user.favAds.push(ad);
        return user.save();
      }
    })
    .then(() => User.findById(user._id));
};

module.exports = favAd;
