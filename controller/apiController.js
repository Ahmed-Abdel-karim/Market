const createAdQuery = require("../database/query/advertise/createAd");
const findAdsQuery = require("../database/query/advertise/findAds");
const updateAdQuery = require("../database/query/advertise/updateAd");
const findUserQuery = require("../database/query/user/findUser");
const imagesQuery = require("../database/query/images/index");
const deleteAdQuery = require("../database/query/advertise/deleteAd");
const updateUserQuery = require("../database/query/user/updateUser");
const addtofavQuery = require("../database/query/advertise/favAd");
const removeFavQuery = require("../database/query/advertise/removeFromFav");
const currentUserAdsQuery = require("../database/query/user/currentUserAds");
const findUserConvQuery = require("../database/query/conversation/findUserConv");
const updateMessagesQuery = require("../database/query/messages/updateMessages");
const findUnseenMessagesQuery = require("../database/query/messages/findUnseenMessages");
const validator = require("validator");

const currentUser = (req, res, next) => {
  findUserQuery(req.user._id)
    .then(user => {
      res.json(user);
    })
    .catch(next);
};

const currentUserAds = (req, res, next) => {
  currentUserAdsQuery(req.user, parseFloat(req.query.skip), req.query.type)
    .then(result => res.json({ details: result[0], count: result[1] }))
    .catch(next);
};

const findUser = (req, res, next) => {
  const _id = req.params._id;
  if (validator.isMongoId(_id)) {
    findUserQuery(_id)
      .then(user => {
        if (!!user) {
          res.json(user);
        } else {
          res.status(404).json({
            message: "user not found"
          });
        }
      })
      .catch(next);
  } else {
    res.status(404).json({
      message: "user not found"
    });
  }
};

const findAds = (req, res, next) => {
  const _id = req.params._id;
  if (_id) {
    if (validator.isMongoId(_id)) {
      return findAdsQuery(null, _id)
        .then(ads => {
          if (!!ads) {
            res.json(ads);
          } else {
            res.status(404).json({
              message: "advertise is either deleted or not found"
            });
          }
        })
        .catch(next);
    } else {
      res.status(404).json({
        message: "advertise is either deleted or not found"
      });
    }
  } else {
    findAdsQuery(req.query)
      .then(result => res.json({ details: result[0], count: result[1] }))
      .catch(next);
  }
};

const createAd = (req, res, next) => {
  req.body.location = req.body.location.split(",");
  let location = [
    parseFloat(req.body.location[1]),
    parseFloat(req.body.location[0])
  ];
  req.body.location = location;
  req.body.price = parseFloat(req.body.price);
  createAdQuery(req.user, req.body, req.files)
    .then(result => {
      return res.json({ _id: result[1]._id, state: true });
    })
    .catch(next);
};

const updateAd = (req, res, next) => {
  const { _id } = req.params;
  req.body.location = req.body.location.split(",");
  let location = [
    parseFloat(req.body.location[1]),
    parseFloat(req.body.location[0])
  ];
  req.body.location = location;
  req.body.price = parseFloat(req.body.price);
  updateAdQuery(_id, req.body, req.files)
    .then(ad => res.json({ _id: ad._id, state: true }))
    .catch(next);
};

const deleteAd = (req, res, next) => {
  const _id = req.params._id;
  deleteAdQuery(_id, req.user)
    .then(() => res.json({ delete: true }))
    .catch(next);
};

const addToFav = (req, res, next) => {
  addtofavQuery(req.user, req.body._id)
    .then(user => {
      res.json(user);
    })
    .catch(next);
};
const removeFromFav = (req, res, next) => {
  removeFavQuery(req.user, req.params._id)
    .then(user => res.json(user))
    .catch(next);
};

const readimage = (req, res, next) => {
  const _id = req.params._id;
  const readstream = imagesQuery.readImage(_id, res);
  readstream.on("error", function(err) {
    if (err) {
      return res.status(404).json({
        message: "image not found"
      });
    }
  });
  readstream.pipe(res);
};

const updateUser = (req, res, next) => {
  req.body.location = req.body.location.split(",");
  let location = [
    parseFloat(req.body.location[1]),
    parseFloat(req.body.location[0])
  ];
  req.body.location = location;
  updateUserQuery(req.user, req.body, req.file)
    .then(user => {
      return res.json(user);
    })
    .catch(next);
};

const currentUserConversations = (req, res, next) => {
  findUserConvQuery(req.user)
    .then(convs => res.send(convs))
    .catch(next);
};

const unseenMessages = (req, res, next) => {
  findUnseenMessagesQuery(req.user)
    .then(messages => res.send({ messages: messages }))
    .catch(next);
};

module.exports = {
  currentUser,
  createAd,
  findAds,
  updateAd,
  readimage,
  deleteAd,
  updateUser,
  addToFav,
  removeFromFav,
  currentUserAds,
  findUser,
  currentUserConversations,
  unseenMessages
};
