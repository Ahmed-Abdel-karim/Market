const User = require("../../model/user");
const ImagesQuery = require("../images/index");

const updateUser = (user, params, avatar) => {
  const items = [
    "name",
    "gender",
    "job",
    "country",
    "region",
    "address",
    "phone_number",
    "email"
  ];
  items.forEach(item => {
    if (params[item]) {
      return (user[item] = params[item]);
    }
  });
  if (params.location) {
    user.location = {
      type: "Point",
      coordinates: params.location
    };
  }
  if (avatar) {
    if (user.avatar) {
      ImagesQuery.deleteImage(avatar);
    }
    user.avatar = avatar.id;
  }
  return user.save();
};

module.exports = updateUser;
