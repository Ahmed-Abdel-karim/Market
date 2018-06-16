const Advertise = require("../../model/advertise");

const currentUserAds = (user, skip, type) => {
  if (type === "Fav") {
    return Promise.all([
      Advertise.find({ _id: { $in: user.favAds } })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(12),
      Advertise.find({ _id: { $in: user.favAds } }).count()
    ]);
  }
  return Promise.all([
    Advertise.find({ user: user._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(12),
    Advertise.find({ user: user._id }).count()
  ]);
};

module.exports = currentUserAds;
