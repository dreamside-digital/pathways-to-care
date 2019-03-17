import * as config from "../../config/firebase-config.json";
import firebase from "firebase";

firebase.initializeApp(config.default);

export default firebase;
