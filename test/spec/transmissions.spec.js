'use strict';

var chai = require('chai')
  , expect = chai.expect
  , SparkPost = require('../../lib/sparkpost')
  , sinon = require('sinon');

require('sinon-as-promised');

chai.use(require('sinon-chai'));
chai.use(require('chai-as-promised'));
var ccTransmission = {
    recipients: [
      {
        address: '"Bob" <recipient1@gmail.com>'
      },
      {
        address: {
          email: 'recipient2@gmail.com',
          name: 'Bertha',
        }
      },
      {
        address: {
          email: 'recipient3@gmail.com'
        }
      },
      {
        address: 'recipient4@gmail.com'
      },
    ],
    cc: [
      {
        address: '"John" <cc1@gmail.com>'
      },
      {
        address: {
          email: 'cc2@gmail.com',
          name: 'Jane',
        }
      }
    ],
    content: {
      template_id: 'hello-world'
    }
  }
  , ccExpectedRecipients = [
      {
        address: {
          email: 'recipient1@gmail.com',
          name: 'Bob',
        }
      },
      {
        address: {
          email: 'recipient2@gmail.com',
          name: 'Bertha',
        }
      },
      {
        address: {
          email: 'recipient3@gmail.com',
        }
      },
      {
        address: {
          email: 'recipient4@gmail.com',
        }
      },
      {
        address: {
          email: 'cc1@gmail.com',
          header_to: '"Bob" <recipient1@gmail.com>, "Bertha" <recipient2@gmail.com>, recipient3@gmail.com, recipient4@gmail.com'
        }
      },
      {
        address: {
          email: 'cc2@gmail.com',
          header_to: '"Bob" <recipient1@gmail.com>, "Bertha" <recipient2@gmail.com>, recipient3@gmail.com, recipient4@gmail.com'
        }
      }
  ]
  , expectedCCHeader = '"John" <cc1@gmail.com>, "Jane" <cc2@gmail.com>';

describe('Transmissions Library', function() {
  var client, transmissions, callback;

  beforeEach(function() {
    client = {
      get: sinon.stub().resolves({}),
      post: sinon.stub().resolves({}),
      reject: SparkPost.prototype.reject
    };

    callback = function() {};

    transmissions = require('../../lib/transmissions')(client);
  });

  describe('list Method', function() {
    it('should call client get method with the appropriate uri', function() {
      return transmissions.list(callback)
        .then(function() {
          expect(client.get.firstCall.args[0].uri).to.equal('transmissions');
          expect(client.get.firstCall.args[1]).to.equal(callback);
        });
    });

    it('should allow campaign_id to be set in options', function() {
      var options = {
        campaign_id: 'test-campaign'
      };

      return transmissions.list(options)
        .then(function() {
          expect(client.get.firstCall.args[0].qs).to.deep.equal({campaign_id: 'test-campaign'});
        });
    });

    it('should allow template_id to be set in options', function() {
      var options = {
        template_id: 'test-template'
      };

      return transmissions.list(options)
        .then(function() {
          expect(client.get.firstCall.args[0].qs).to.deep.equal({template_id: 'test-template'});
        });
    });
  });

  describe('find Method', function() {
    it('should call client get method with the appropriate uri', function() {
      return transmissions.get('test', callback)
        .then(function() {
          expect(client.get.firstCall.args[0]).to.deep.equal({uri: 'transmissions/test'});
          expect(client.get.firstCall.args[1]).to.equal(callback);
        });
    });

    it('should throw an error if id is missing', function() {
      return expect(transmissions.get()).to.be.rejectedWith('id is required');
    });
  });

  describe('send Method', function() {
    it('should call client post method with the appropriate uri and payload', function() {
      var transmission = {
        campaign_id: 'test-campaign'
      };

      return transmissions.send(transmission, callback)
        .then(function() {
          expect(client.post.firstCall.args[0].uri).to.equal('transmissions');
          expect(client.post.firstCall.args[0].json).to.deep.equal(transmission);
          expect(client.post.firstCall.args[1]).to.equal(callback);
        });
    });

    it('should throw an error if transmission object is missing', function() {
      return expect(transmissions.send(function() {})).to.be.rejectedWith('transmission object is required');
    });

    it('should allow num_rcpt_errors to be set in options', function() {
      var transmission = {
          campaign_id: 'test-campaign'
        }
        , options = {
          num_rcpt_errors: 3
        };

      return transmissions.send(transmission, options)
        .then(function() {
          expect(client.post.firstCall.args[0].qs).to.deep.equal({num_rcpt_errors: 3});
        });
    });

    it('should not throw an error if optional 2nd argument is a function (callback)', function() {
      let cb = sinon.stub()
        , transmission = {
          campaign_id: 'test-campaign'
        };

      client.post.yields();

      return transmissions.send(transmission, cb).then(function() {
        expect(cb.callCount).to.equal(1);
      });
    });

    it('should leave email_rfc822 content keys intact', function() {
      var options = {
        content: {
          email_rfc822: 'Content-Type: text/plain\nFrom: From Envelope <from@example.com>\nSubject: Example Email\n\nHello World'
        }
      };

      return transmissions.send(options)
        .then(function() {
          expect(client.post.firstCall.args[0].json.content).to.have.property('email_rfc822');
        });
    });

    it('should allow a list_id and template through', function() {
      var transmission = {
        recipients: {
          list_id: 'my-list-id'
        },
        content: {
          template_id: 'my-template-id'
        }
      };

      return transmissions.send(transmission)
        .then(function() {
          expect(client.post.firstCall.args[0].json).to.deep.equal(transmission);
        });
    });

    it('should ignore empty bcc and cc', function() {
      var transmission = {
        recipients: [
          {
            address: {
              name: "Bob",
              email: "recipient1@gmail.com"
            }
          },
        ],
        cc: [],
        bcc: [],
        content: {
          template_id: 'my-template-id'
        }
      };

      return transmissions.send(transmission)
        .then(function() {
          delete transmission.cc;
          delete transmission.bcc;

          expect(client.post.firstCall.args[0].json).to.deep.equal(transmission);
        });
    });

    it('should convert cc to the correct recipients and headers', function() {
      return transmissions.send(ccTransmission)
        .then(function() {
          expect(client.post.firstCall.args[0].json.recipients).to.deep.equal(ccExpectedRecipients);
          expect(client.post.firstCall.args[0].json.content.headers.CC).to.deep.equal(expectedCCHeader);
        });
    });

    it('should convert bcc to the correct recipients and headers', function() {
      var bccTransmission = ccTransmission
        , bccExpectedRecipients = ccExpectedRecipients;
      bccTransmission['bcc'] = bccTransmission['cc'];
      delete bccTransmission['cc'];

      return transmissions.send(bccTransmission)
        .then(function() {
          expect(client.post.firstCall.args[0].json.recipients).to.deep.equal(bccExpectedRecipients);
          expect(client.post.firstCall.args[0].json.content.headers).to.be.undefined;
        });
    });

    it('should not modify a transmission using the full cc/bcc syntax', function() {
      var transmission = {
        recipients: [
          {
            address: {
              email: 'original.recipient@example.com',
              name: 'Original Recipient'
            },
            substitution_data: {
              recipient_type: 'Original'
            }
          },
          {
            address: {
              email: 'bcc.recipient@example.com',
              header_to: '"Original Recipient" <original.recipient@example.com>'
            },
            substitution_data: {
              recipient_type: 'BCC'
            }
          }
        ],
        content: {
          from: {
            name: 'Node BCC Test',
            email: 'from@example.com'
          },
          subject: 'Example email using bcc',
          text: 'An example email using bcc with SparkPost to the {{recipient_type}} recipient.',
          html: '<p>An example email using bcc with SparkPost to the {{recipient_type}} recipient.</p>'
        }
      };

      return transmissions.send(transmission)
        .then(function() {
          expect(client.post.firstCall.args[0].json).to.deep.equal(transmission);
        });
    });
  });
});
