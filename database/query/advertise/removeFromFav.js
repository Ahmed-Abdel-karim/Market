const Advertise = require("../../model/advertise");
const User = require("../../model/user");

const removeFromFav = (user, _id) => {
  user.favAds = user.favAds.filter(e => {
    if (!(e.toString() == _id.toString())) {
      return e;
    }
  });
  return user.save().then(() => User.findById(user._id));
};

module.exports = removeFromFav;
