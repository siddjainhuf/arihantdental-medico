const secret = require('./secret');
const g = require('../common/global').global;
var SibApiV3Sdk = require('sib-api-v3-sdk');
var defaultClient = SibApiV3Sdk.ApiClient.instance;
let apiKey, partnerKey;

async function init() {
    apiKey = defaultClient.authentications['api-key'];
    console.log("[SID]Fetching Secret");
    let sendBlueAPIKey = await secret.getSecret(g.SECRET_SENDBLUE_API_KEY)
    console.log("[SID]Secret Fetched");
    console.log('Sendblue API Key Fetched');
    apiKey.apiKey = sendBlueAPIKey;

    console.log("[SID]Setting Partner Key");
    partnerKey = defaultClient.authentications['partner-key'];
    partnerKey.apiKey = sendBlueAPIKey;
    console.log("[SID]Partner key set");
}
async function sendOneEmail(
    to,
    subject,
    htmlContent
) {
    try {
        let smtpEmail = new SibApiV3Sdk.SendSmtpEmail();
        smtpEmail.sender = { email: g.OWNER_EMAIL_ID };
        smtpEmail.to = [{ email: to }];
        smtpEmail.subject = subject;
        smtpEmail.htmlContent = htmlContent;
        var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
        await apiInstance.sendTransacEmail(smtpEmail);
        return 'success'
    } catch (err) {
        throw err;
    }
}
module.exports = {
    init: init,
    sendOneEmail: sendOneEmail
}