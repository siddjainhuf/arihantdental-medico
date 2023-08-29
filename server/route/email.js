const express = require('express');
var bodyParser = require('body-parser');
const router = express.Router();
const emailService = require('../services/email');
// const dbService = require('../services/db');
const g = require('../common/global').global;
let initialized = false;
let err = "";
emailService.init()
    .then(() => { initialized = true; })
    .catch((error) => { err = error; })


router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

let status = {
    ERROR: 'error',
    SUBSCRIBED: 'subscribed',
    ALREADY_SUBSCRIBED: 'already subscribed'
};

async function subscribe(email) {
    console.log("[SID]Inside Subscribe Function");
    if (initialized === false) {
        console.log("[SID]Subscribe Not Initialized");
        return status.ERROR;
        await emailService.init()
            .then(() => { initialized = true; })
            .catch((error) => {
                console.log("[SID]Error in Initialization");
                err = error;
            })
    }
    //let retVal = await dbService.addSubscription(email);
    /*if (!retVal) {
        return status.ALREADY_SUBSCRIBED;
    }*/
    console.log("[SID]Sending First Email");
    await emailService.sendOneEmail(g.OWNER_EMAIL_ID, "[akhilbhansali.in]Subscription Request",
        `New subscription request from ${email}`);
    console.log("Sending Seccond Email");
    await emailService.sendOneEmail(email, "[akhilbhansali.in]Subscription Request",
        `Thankyou for your interest and subscription. We will keep you updated.<br><br>
Best Regards,
Akhil
        `);
    console.log("[SID]All Email Sent");
    return status.SUBSCRIBED;
}

async function addMessage(name, email, subject, message) {
    // await dbService.addMessage(name, email, subject, message);
    await emailService.sendOneEmail(g.OWNER_EMAIL_ID, "[akhilbhansali.in]New message",
        `<H3>New message</H3> <br>
            Name: ${name},<br>
            Email: ${email},<br>
            Subject: ${subject},<br>
            Message: ${message}`);

    return "success"
}
router.post('/subscribe', function(req, res, next) {
    console.log("[SID]Inside /subscribe");
    subscribe(req.body.email)
        .then((retVal) => {
            console.log("[SID]Subscribe Returned Successfully");
            res.status(200).send({ status: retVal });
        })
        .catch((err) => {
            console.log("[SID]Error in Subscribe");
            console.log(err);
            // res.status(400).send(err);
            res.status(400).send({ status: status.ERROR });
        });
});

router.post('/sendmessage', function(req, res, next) {
    console.log("called");
    addMessage(req.body.name, req.body.email, req.body.subject, req.body.message)
        .then((retVal) => {
            res.status(200).send({ status: retVal });
        })
        .catch((err) => {
            console.log(err);
            // res.status(400).send(err);
            res.status(400).send({ status: status.ERROR });
        });
});

module.exports = router;