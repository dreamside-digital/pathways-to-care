import React from 'react'
import firebase from "../firebase/init";
import { navigate } from 'gatsby';
import { connect } from "react-redux";
import { FirebaseAuth } from 'react-firebaseui';
import {
  userLoggedIn,
  userLoggedOut,
} from "../redux/actions";


const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'column'
  }
}

const uiConfig = {
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  credentialHelper: 'NONE',
  callbacks: {
      signInSuccessWithAuthResult: () => navigate('/')
    }
};

class LoginPage extends React.Component {
  state = { firebaseAuth: null }

  componentDidMount() {
    this.setState({ firebaseAuth: firebase.auth() }, () => {
      this.state.firebaseAuth.onAuthStateChanged(user => {
        if (user) {
          const ref = firebase
            .app()
            .database()
            .ref(`users/${user.uid}`);
          ref.once("value").then(snapshot => {
            const userData = snapshot.val();
            if (userData) {
              this.props.userLoggedIn(userData);
            } else {
              const newUser = {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL
              };
              ref.set(newUser);
              this.props.userLoggedIn(newUser);
            }
          });
        } else {
          this.props.userLoggedOut();
        }
      });
    })
  }


  render () {
    return (
      <div className="container full-screen" style={styles.container}>
          <h1>Sign up / Sign in</h1>
          {this.state.firebaseAuth && <FirebaseAuth uiConfig={uiConfig} firebaseAuth={this.state.firebaseAuth} />}
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    isLoggedIn: state.adminTools.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userLoggedIn: user => {
      dispatch(userLoggedIn(user));
    },
    userLoggedOut: () => {
      dispatch(userLoggedOut());
    },
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(
  LoginPage
);
