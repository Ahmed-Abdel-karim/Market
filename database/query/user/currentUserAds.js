const Ad = require("../../model/ad");

const currentUserAds = (user, skip, type) => {
  if (type === "Fav") {
    return Promise.all([
      Ad.find({ _id: { $in: user.favAds } })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(12),
      Ad.find({ _id: { $in: user.favAds } }).count()
    ]);
  }
  return Promise.all([
    Ad.find({ user: user._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(12),
    Ad.find({ user: user._id }).count()
  ]);
};

module.exports = currentUserAds;
