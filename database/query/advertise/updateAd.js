const Advertise = require("../../model/advertise");
const findAdQuery = require("./findAds");
const ImagesQuery = require("../images/index");

const updateAd = (_id, params, images) => {
  return findAdQuery(null, _id).then(ad => {
    ad.title = params.title;
    ad.price = params.price;
    ad.description = params.description;
    ad.category = params.category;
    ad.email = params.email;
    ad.phone_number = params.phone_number;
    ad.brand = params.brand;
    ad.location = {
      type: "Point",
      coordinates: params.location
    };
    ad.address = params.address;
    ad.tags = params.tags;

    if (images) {
      let allImages = ad.gallery;
      let galleryImages = [];
      let deletedImages = [];
      images.forEach(img => {
        allImages.unshift(img.id);
      });
      for (let i = 0; i < allImages.length; i++) {
        if (i < 3) {
          galleryImages[i] = allImages[i];
        } else {
          deletedImages[i - 3] = allImages[i];
        }
      }
      ad.gallery = galleryImages;
      if (deletedImages.length > 0) {
        deletedImages.forEach(image => {
          ImagesQuery.deleteImage(image);
        });
      }
    }
    return ad.save();
  });
};

module.exports = updateAd;
