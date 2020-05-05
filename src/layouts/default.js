import React, { Fragment } from "react";
import PropTypes from "prop-types"
import Helmet from "react-helmet";
import { connect } from "react-redux";
import withRoot from '../utils/withRoot';

import Notification from "../components/notifications/Notification";
import AccountButton from "../components/navigation/AccountButton"
import Navigation from "../components/navigation/Navigation"
import Footer from "../components/navigation/Footer"
import Loader from "../components/common/Loader"
import CreatePageModal from "../components/editing/CreatePageModal";
import SEO from "./SEO"

import {
  EditablesContext,
  theme
} from 'react-easy-editables';

import "../assets/sass/less-cms/base.scss";
import "../assets/css/bootstrap.min.css";
import "../assets/css/animate.css";
import "../assets/css/fontawesome-all.css";
import "../assets/css/themify-icons.css";
import "../assets/css/magnific-popup/magnific-popup.css";
import "../assets/css/owl-carousel/owl.carousel.css";
import "../assets/sass/base.scss";
import "../assets/sass/style.scss";
import "../assets/sass/responsive.scss";


const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flexGrow: '1'
  }
}

export const customTheme = {
  primaryColor: "#D97B77",
  fontFamily: "sans-serif",
  fontSize: "14px",
  editContainer: {
    backgroundColor: "rgba(255,255,255,0.3)",
    border: "1px solid black",
    position: "relative",
    padding: "8px",
  },
  editContainerHighlight: {
    backgroundColor: "rgba(255,255,255,0.9)",
    border: "1px solid #D97B77",
    zIndex: "2500",
  },
  actions: {
    position: "absolute",
    left: "2px",
    top: "2px",
    display: "flex",
    alignItems: "center",
    zIndex: "99",
  },
  button: {
    border: "1px solid #000",
    color: "black",
    backgroundColor: "#fff",
    height: "18px",
    width: "18px",
    borderRadius: "30px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "4px",
    "&:hover": {
      backgroundColor: "grey"
    }
  },
  saveButton: {
    backgroundColor: "#D97B77",
  },
  cancelButton: {
    backgroundColor: "#D97B77",
  },
  icon: {
    fontSize: "14px"
  }
};


const mapStateToProps = state => {
  return {
    isEditingPage: state.adminTools.isEditingPage,
  };
};


const DefaultLayout = props => (
  <div style={styles.container}>
    <SEO
      title={ props.title }
      description={ props.description }
      image={ props.image }
      pathname={ props.pathname }
    />
    <Notification />
    <AccountButton />
    <Loader />

    <EditablesContext.Provider value={ { theme: customTheme, showEditingControls: props.isEditingPage } }>
      <div className="page-wrapper">

        <Navigation />
        <Fragment>{props.children}</Fragment>
        <Footer />

        <div className="scroll-top"><a className="smoothscroll" href="#top"><i className="flaticon-upload"></i></a></div>

      </div>
      <CreatePageModal />
    </EditablesContext.Provider>
  </div>
);

DefaultLayout.defaultProps = {
  title: 'Pathways to Care',
}

DefaultLayout.propTypes = {
  title: PropTypes.string.isRequired,
}

export default withRoot(connect(mapStateToProps, null)(DefaultLayout));


