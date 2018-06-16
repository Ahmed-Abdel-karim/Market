const Advertise = require("../../model/advertise");
const imageQuery = require("../images/index");
const deleteAd = (_id, user) => {
  return Advertise.findById(_id).then(ad => {
    if (ad.user.toString() === user._id.toString()) {
      if (ad.gallery) {
        ad.gallery.forEach(image => {
          imageQuery.deleteImage(image);
        });
      }
      var index = user.advertises.indexOf(ad._id);
      if (index > -1) {
        user.advertises.splice(index, 1);
      }
      return user.save().then(res => ad.remove());
    }
  });
};

module.exports = deleteAd;
