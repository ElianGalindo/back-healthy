const admin = require ('firebase-admin')
const serviceAccount = require('./serviceAccountKey.json')

//Inicializar Firebase Admin SDK
admin. initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

module.exports = admin