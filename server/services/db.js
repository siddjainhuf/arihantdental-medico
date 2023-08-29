const admin = require('firebase-admin');
const uuid = require('uuid');
admin.initializeApp({
    credential: admin.credential.applicationDefault()
});

const db = admin.firestore();

async function addSubscription(email) {
    const docRef = db.collection('subscription').doc(email);
    let doc = await docRef.get();
    if (doc.exists) {
        return false
    } else {
        await docRef.set({});
        return true;
    }
}
async function addMessage(name, email, subject, message) {
    let id = uuid.v4();
    const docRef = db.collection('message').doc(id);
    await docRef.set({
        name: name,
        email: email,
        subject: subject,
        mesage: message
    });
    return true;
}
module.exports = {
    addSubscription: addSubscription,
    addMessage: addMessage
}