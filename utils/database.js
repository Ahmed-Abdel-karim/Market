const keys = require("../configue/keys");
const mongoose = require("mongoose");
const Advertise = require("../database/model/advertise");
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongodbURL);
let gridfs;
mongoose.connection
  .once("open", () => {
    gridfs = require("mongoose-gridfs")({
      model: "Attachment",
      mongooseConnection: mongoose.connection
    });
  })
  .on("error", error => console.log(error));
