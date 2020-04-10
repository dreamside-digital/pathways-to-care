import firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"
import "firebase/storage"

const config = require(`../../config/firebase-config.json`)
firebase.initializeApp(config);

export default firebase;
