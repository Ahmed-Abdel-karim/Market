const sgMail = require("@sendgrid/mail");
const keys = require("../configue/keys");
const authenticationEmails = msg => {
  sgMail.setApiKey(keys.sendGrid);
  return sgMail.send(msg);
};

module.exports = authenticationEmails;
