const express = require("express");
const router = express.Router();
const twilio = require("twilio");
const VoiceResponse = twilio.twiml.VoiceResponse;

const config = require("../config");

// POST /call/connect
router.post(
  "/connect",
  twilio.webhook({ validate: false }),
  function (req, res, next) {
    var phoneNumber = req.body.phoneNumber;
    var callerId = config.twilioPhoneNumber;
    console.log(req, callerId);
    // var phoneNumber = +918788770201;
    // var callerId = +12292104806;
    var twiml = new VoiceResponse();

    var dial = twiml.dial({ callerId: callerId });
    if (phoneNumber) {
      dial.number({}, phoneNumber);
    } else {
      dial.client({}, "support_agent");
    }

    res.send(twiml.toString());
  }
);

module.exports = router;
