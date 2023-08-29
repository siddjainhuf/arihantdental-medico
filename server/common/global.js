/*
Mandatory environment variables:
"GOOGLE_APPLICATION_CREDENTIALS": "${workspaceFolder}\\abc.json",
"CLIENT_ID": "used for oauth",
"CLIENT_SECRET": "used for oauth",
"WEBSERVER_URL": "used for whereever we require URL reference"
*/
let global = {
    PROJECT_NAME: "akhilbhansali",
    PROJECT_ID: "akhilbhansali",
    PROJECT_NUMBER: "490113048763",
    LOG_LEVEL: "info",
    GCLOUD_STORAGE_BUCKET: "akhilbhansali_storage",
    //Secret
    SECRET_SENDBLUE_API_KEY: "sendinblue_api_key",
    OWNER_EMAIL_ID: 'akhil@agilebeings.com'
}

function initialize() {

}
module.exports = {
    global: global,
    ginit: initialize
};