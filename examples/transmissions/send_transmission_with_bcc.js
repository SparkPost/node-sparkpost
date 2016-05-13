"use strict";

var key = "YOURAPIKEY"
  , SparkPost = require("sparkpost")
  , client = new SparkPost(key);

var reqOpts = {
  transmissionBody: {
    recipients: [
      {
        address: {
          email: "original.recipient@example.com",
          name: "Original Recipient"
        },
        substitution_data: {
          recipient_type: "Original"
        }
      },
      {
        address: {
          email: "bcc.recipient@example.com",
          header_to: '"Original Recipient" <original.recipient@example.com>'
        },
        substitution_data: {
          recipient_type: "BCC"
        }
      }
    ],
    content: {
      from: {
        name: "Node BCC Test",
        email: "from@example.com"
      },
      subject: "Example email using bcc",
      text: "An example email using bcc with SparkPost to the {{recipient_type}} recipient.",
      html: "<p>An example email using bcc with SparkPost to the {{recipient_type}} recipient.</p>"
    }
  }
};

client.transmissions.send(reqOpts, function(err, res) {
  if (err) {
    console.log(err);
  } else {
    console.log(res.body);
    console.log("Congrats! You sent an email with bcc using SparkPost!");
  }
});
