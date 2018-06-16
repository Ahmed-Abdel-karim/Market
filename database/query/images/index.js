const keys = require("../../../configue/keys");
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const fs = require("fs");
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongodbURL);
let gfs;
mongoose.connection
  .once("open", () => {
    gfs = Grid(mongoose.connection.db, mongoose.mongo);
    gfs.collection("images");
  })
  .on("error", error => console.log(error));

const readImage = (_id, res) => {
  return gfs.createReadStream({ _id });
};

const deleteImage = _id => {
  gfs.remove(
    {
      _id,
      root: "images"
    },
    function(err, gridStore) {
      if (err) {
        throw err;
      }
      console.log("success");
    }
  );
};

module.exports = { readImage, deleteImage };
