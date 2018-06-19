const express = require("express");
const apiRouter = express.Router();
const apiController = require("../controller/apiController");
const upload = require("../utils/multer");
const passport = require("passport");
const authentication = passport.authenticate("jwt", { session: false });
const validation = require("../middleware/validation");
/********************************************************* */
/* ad routes*/
apiRouter.get("/ad", apiController.findAds);
apiRouter.get("/ad/:_id", apiController.findAds);
apiRouter.post(
  "/ad",
  authentication,
  upload.array("images", 3),
  validation.ad,
  apiController.createAd
);
apiRouter.post("/fav", authentication, apiController.addToFav);
apiRouter.delete("/fav/:_id", authentication, apiController.removeFromFav);
apiRouter.put(
  "/ad/:_id",
  authentication,
  upload.array("images", 3),
  validation.ad,
  apiController.updateAd
);
apiRouter.delete("/ad/:_id", authentication, apiController.deleteAd);
apiRouter.get("/img/:_id", apiController.readimage);
/******************************************************************* */
/* user routes */
apiRouter.get("/current_user", authentication, apiController.currentUser);
apiRouter.put(
  "/current_user",
  authentication,
  upload.single("avatar"),
  validation.updateUser,
  apiController.updateUser
);
apiRouter.get(
  "/current_user/ads",
  authentication,
  apiController.currentUserAds
);
apiRouter.get("/user/:_id", apiController.findUser);
apiRouter.get(
  "/current_user/conversations",
  authentication,
  apiController.currentUserConversations
);
apiRouter.get(
  "/user_unseen_messages",
  authentication,
  apiController.unseenMessages
);
/*********************************************************************** */

module.exports = apiRouter;
