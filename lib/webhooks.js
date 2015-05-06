'use strict';

var api = 'webhooks';

var toApiFormat = function(input) {
  var model = input;

  return model;
};

module.exports = function(client) {
  var webhooks = {
    all: function(options, callback) {
      var reqOpts = {
        uri: api
      };

      if (typeof options === 'function') {
        callback = options;
        options = {};
      }

      if (options.timezone) {
        reqOpts.qs = reqOpts.qs || {};
        reqOpts.qs.timezone = options.timezone;
      }

      client.get(reqOpts, callback);
    },
    describe: function(options, callback) {
      options = options || {};

      if(!options.id) {
        callback(new Error('id is required'));
        return;
      }
      var reqOpts = {
        uri: api + '/' + options.id
      };

      if (options.timezone) {
        reqOpts.qs = reqOpts.qs || {};
        reqOpts.qs.timezone = options.timezone;
      }

      client.get(reqOpts, callback);
    },
    create: function(webhook, callback) {
      if(typeof webhook === 'function') {
        callback = webhook;
        webhook = null;
      }

      if(!webhook) {
        callback(new Error('webhook object is required'));
        return;
      }
      var options = {
        uri: api
        , json: toApiFormat(webhook)
      };

      client.post(options, callback);
    },
    update: function(webhook, callback) {
      if(typeof webhook === 'function') {
        callback = webhook;
        webhook = null;
      }

      if(!webhook) {
        callback(new Error('webhook object is required'));
        return;
      }

      var object = toApiFormat(webhook)
        , options = {
          uri: api + '/' + object.id
          , json: object
        };

      client.put(options, callback);
    },
    validate: function(options, callback) {
      options = options || {};

      if(!options.id) {
        callback(new Error('id is required'));
        return;
      }

      if(!options.message) {
        callback(new Error('message is required'));
        return;
      }

      var reqOpts = {
        uri: api + '/' + options.id + '/validate'
        , json: {
          message: options.message
        }
      };

      client.post(reqOpts, callback);
    },
    getBatchStatus: function(options, callback) {
      options = options || {};

      if(!options.id) {
        callback(new Error('id is required'));
        return;
      }

      var reqOpts = {
        uri: api + '/' + options.id + '/batch-status'
      };

      if (options.timezone) {
        reqOpts.qs = reqOpts.qs || {};
        reqOpts.qs.timezone = options.timezone;
      }

      client.get(reqOpts, callback);
    }
  };

  webhooks['delete'] = function(id, callback) {
    if (typeof id === 'function') {
      callback = id;
      id = null;
    }

    if (!id) {
      callback(new Error('id is required'));
      return;
    }

    var options = {
      uri: api + '/' + id
    };

    client['delete'](options, callback);
  };

  return webhooks;
};
