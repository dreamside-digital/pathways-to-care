import React from "react";

import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { FirebaseAuth } from "react-firebaseui";
import firebase from "../../firebase/init";

const RegistrationModal = props => {
  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    credentialHelper: "NONE"
  };

  const { onToggleRegistrationModal, ...other } = props;

  return (
    <Dialog
      onClose={onToggleRegistrationModal}
      aria-labelledby="registration-dialogue"
      {...other}
    >
      <DialogTitle id="registration-dialogue">Sign up / Sign in</DialogTitle>
      <div className="modal-body">
        <FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </div>
    </Dialog>
  );
};

export default RegistrationModal;
