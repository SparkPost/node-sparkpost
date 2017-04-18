'use strict';

const key = 'YOURAPIKEY';
const SparkPost = require('sparkpost');
const client = new SparkPost(key);
const transmission = {
  recipients: [{address: {email: 'john.doe@example.com'}}],
  content: {
    from: 'From Envelope <from@example.com>',
    subject: 'Example Email for Inline Image',
    html: '<p>My fantastic HTML content.<br><br><b>SparkPost</b> <img src="cid:AnImage.png"></p>',
    text: 'Simple text content',
    inline_images: [
      {
        type: 'image/png',
        name: 'AnImage.png',
        data: 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAlwSFlzAAAWJQAAFiUBSVIk8AAAAXxJREFUOBFjvJVg84P5718WBjLAX2bmPyxMf/+xMDH8YyZDPwPDXwYGJkIaOXTNGdiUtHAqI2jA/18/GUQzGsg3gMfKg4FVQo6BiYcPqyF4XcChaczA4+DP8P//f4b/P3+SZgAzvxCDSGYjAyMjI8PvZw+AoYXdLuyiQLtE0uoZWAREwLb+fnKXQTipkngXcJu7MnACQx8G2FX1GHgs3bDGBlYX8HlFM/z9+JbhzewWhmf1CQyfti9j+PfzBwO/ZxTMTDiNmQKBfmZX1GB42V/K8P38YbDCX/dvMDAwMzPwuYbBNcIYmC4AhfjvXwx/376AqQHTf96+ZPj34xuKGIiDaQBQ8PPBTQwCoZkMjJzcYA3MgqIMAr7xDJ/3rAHzkQnGO7FWf5gZ/qLmBSZmBoHgNAZee1+Gf18/MzCyczJ83LyQ4fPetch6Gf4xMP3FbgBMGdAgJqAr/n37zABMTTBROA0ygAWUJUG5Civ4B8xwX78CpbD6FJiHmf4AAFicbTMTr5jAAAAAAElFTkSuQmCC'
      }
    ]
  }
};

// Promise
client.transmissions.send(transmission)
  .then((data) => {
    console.log('Congrats you can use our client library!');
    console.log(data);
  })
  .catch((err) => {
    console.log('Whoops! Something went wrong');
    console.log(err);
  });

// Callback
client.transmissions.send(transmission, function(err, data) {
  if (err) {
    console.log('Whoops! Something went wrong');
    console.log(err);
  } else {
    console.log('Congrats you can use our client library!');
    console.log(data);
  }
});
