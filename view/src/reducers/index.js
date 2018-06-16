import { combineReducers } from "redux";
import userReducer from "./userReducer";
import adsReducer from "./adsReducer";
import commentsReducer from "./commentsReducer";
import { reducer as formReducer } from "redux-form";
import createOrUpdateAdReducer from "./createOrUpdateAdReducer";
import searchAdsReducer from "./searchAdReducer";
import userConversationsReducer from "./userConversationsReduser";
import conversationReducer from "./conversationReducer";
import flashMessageReducer from "./flashMessageReducer";
import profileReducer from "./profileReducer";
import verificationErrorReducer from "./verificationErrorReducer";
import resetPasswordReducer from "./resetPasswordReducer";
import waitReducer from "./waitReducer";
import unseenReducer from "./unseenReducer";
import messageReceiverReducer from "./messageReceiverReducer";
import sendNotificationReducer from "./sendNotificationReducer";
import { reducer as notificationsReducer } from "reapop";

export default combineReducers({
  user: userReducer,
  ads: adsReducer,
  form: formReducer,
  comments: commentsReducer,
  createOrUpdateAd: createOrUpdateAdReducer,
  searchAds: searchAdsReducer,
  userConversations: userConversationsReducer,
  conversation: conversationReducer,
  unseen: unseenReducer,
  flashMessage: flashMessageReducer,
  profile: profileReducer,
  verificationError: verificationErrorReducer,
  resetPassword: resetPasswordReducer,
  wait: waitReducer,
  messageReceiver: messageReceiverReducer,
  sendNotification: sendNotificationReducer,
  notifications: notificationsReducer()
});
