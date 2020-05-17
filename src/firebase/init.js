import firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"
import "firebase/storage"

const activeEnv = process.env.GATSBY_FIREBASE_ENVIRONMENT || process.env.NODE_ENV || "development"
const config = require(`../../config/firebase-config.${activeEnv}.json`)
const stagingConfig = require(`../../config/firebase-config.staging.json`)

let defaultFirebase = null;
let stagingFirebase = null;

console.log(`Using ${activeEnv} firebase configuration`)

if (!defaultFirebase) {
  defaultFirebase = firebase.initializeApp(config);
}

if (!stagingFirebase) {
  stagingFirebase = firebase.initializeApp(stagingConfig, "staging")
}

export default firebase;
export { stagingFirebase }
