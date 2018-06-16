const User = require("../../model/user");
const Comment = require("../../model/comment");
const Advertise = require("../../model/advertise");
const findAdQuery = require("../../query/advertise/findAds");

const addCommnetQuery = (comment, ad, user) => {
  const newComment = new Comment({
    content: comment
  });
  ad.comments.push(newComment);
  newComment.user = user;
  return Promise.all([ad.save(), newComment.save()]).then(res =>
    findAdQuery(null, res[0]._id)
  );
};

module.exports = addCommnetQuery;
