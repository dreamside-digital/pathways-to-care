import React from 'react';
import { connect } from "react-redux";
import { StaticQuery, graphql } from "gatsby";

import {
  userLoggedIn,
  userLoggedOut,
  toggleRegistrationModal,
} from "../redux/actions";

import Navigation from "../components/navigation/Navigation";

const mapStateToProps = state => {
  return {
    isLoggedIn: state.adminTools.isLoggedIn,
    showRegistrationModal: state.adminTools.showRegistrationModal,
    showMenu: state.navigation.showMenu,
    user: state.adminTools.user,
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
    onToggleRegistrationModal: () => {
      dispatch(toggleRegistrationModal());
    },
  };
};

const NavigationComponent = props => (
  <StaticQuery
    query={graphql`
      query {
        allPages {
          edges {
            node {
              title
              slug
              navigation {
                order
                displayTitle
              }
            }
          }
        }
      }
    `}
    render={data => (
      <Navigation {...props} pages={data.allPages.edges} />
    )}
  />
);

export default connect(mapStateToProps, mapDispatchToProps)(NavigationComponent);
