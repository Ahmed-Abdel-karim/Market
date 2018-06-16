const Commnet = require("../../model/comment");

const deleteComment = _id => Commnet.findByIdAndRemove(_id);

module.exports = deleteComment;
