"use strict";

var key = "YOURAPIKEY"
  , SparkPost = require("sparkpost")
  , client = new SparkPost(key);

var reqOpts = {
  transmissionBody: {
    options: {
      open_tracking: true,
      click_tracking: true
    },
    campaign_id: "christmas_campaign",
    return_path: "bounces-christmas-campaign@flintstone.com",
    metadata: {
      user_type: "students"
    },
    substitution_data: {
      sender: "Big Store Team"
    },
    recipients: [
      {
        return_path: "123@bounces.flintstone.com",
        address: {
          email: "wilma@flintstone.com",
          name: "Wilma Flintstone"
        },
        tags: [
          "greeting",
          "prehistoric",
          "fred",
          "flintstone"
        ],
        metadata: {
          place: "Bedrock"
        },
        substitution_data: {
          customer_type: "Platinum"
        }
      }
    ],
    content: {
      from: {
        name: "Fred Flintstone",
        email: "fred@flintstone.com"
      },
      subject: "Big Christmas savings!",
      reply_to: "Christmas Sales <sales@flintstone.com>",
      headers: {
        "X-Customer-Campaign-ID": "christmas_campaign"
      },
      text: "Hi {{address.name}} \nSave big this Christmas in your area {{place}}! \nClick http://www.mysite.com and get huge discount\n Hurry, this offer is only to {{customer_type}}\n {{sender}}",
      html: "<p>Hi {{address.name}} \nSave big this Christmas in your area {{place}}! \nClick http://www.mysite.com and get huge discount\n</p><p>Hurry, this offer is only to {{customer_type}}\n</p><p>{{sender}}</p>"
    }
  }
};

client.transmissions.send(reqOpts, function(err, res) {
  if (err) {
    console.log(err);
  } else {
    console.log(res.body);
    console.log("Congrats you can use our SDK!");
  }
});
