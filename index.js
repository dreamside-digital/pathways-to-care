const express = require("express");
const shell = require("shelljs");
const admin = require("firebase-admin");
const serviceAccount = require("./config/firebase-config.json").serviceAccountKey;
const databaseURL = require("./config/firebase-config.json").databaseURL;
const cors = require("cors");
const morgan = require('morgan');
const winston = require('./config/winston');

const app = express();
app.use(cors({ credentials: true, origin: true }));
app.use(morgan('combined', { stream: winston.stream }));


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: databaseURL
});

function deployToolkit() {
  const child = shell.exec(`yarn deploy`, { async: true });

  child.on(`exit`, (code, signal) => {
    console.log(
      `====== Child process exited with code ${code} and signal ${signal} ======`
    );
    winston.info(
      `====== Child process exited with code ${code} and signal ${signal} ======`
    );
  });

  child.on(`error`, err => {
    console.log(`err:`, err);
    winston.info(`err:`, err);
  })
}

app.get("/", (req, res) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    console.log('Missing authorization token')
    winston.info('Missing authorization token')
    return res.json({
      status: "unauthorized",
      message: "Missing authorization token"
    });
  }

  const token = authHeader.split(" ")[1];
  const checkRevoked = true;

  admin
    .auth()
    .verifyIdToken(token, checkRevoked)
    .then(decodedToken => {
      const uid = decodedToken.uid;
      const db = admin.database();

      return db.ref(`users/${uid}`).once("value");
    })
    .then(snapshot => {
      const userRecord = snapshot.val();
      if (userRecord && userRecord.isEditor) {
        deployToolkit();
        console.log(
          `***** Website deployment started by ${userRecord.displayName} *****`
        );

        winston.info(
          `***** Website deployment started by ${userRecord.displayName} *****`
        );
        return res.json({ status: "success" });
      }
      res.json({
        status: "unauthorized",
        message: "Your account is not authorized for this action."
      });
    })
    .catch(error => {
      console.log("ERROR", error);
      winston.info("ERROR", error);
      if (error.code == "auth/id-token-revoked") {
        // Token has been revoked. Inform the user to reauthenticate or signOut() the user.
        res.json({
          error: error.code,
          message:
            "Your session is no longer valid. Please log in and try again."
        });
      } else {
        res.json({ error: error.code, message: error.message });
      }
    });
});

app.listen(8080, () => {
  console.log("App listening on port 8080!")
  winston.info("App listening on port 8080!")
});
