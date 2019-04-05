import React, { Fragment } from "react";
import Helmet from "react-helmet";
import withRoot from '../utils/withRoot';

import Notification from "../components/notifications/Notification";
import AccountButton from "../components/navigation/AccountButton"
import Navigation from "../components/navigation/Navigation"
import Footer from "../components/navigation/Footer"
import Loader from "../components/common/Loader"

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

import favicon from '../assets/images/icon.png'


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

const DefaultLayout = props => (
  <div style={styles.container}>
    <Helmet>
      <title>
        Pathways to Care
      </title>
      <meta
        charSet="utf-8"
        description="Simple and flexible CMS for static sites"
        keywords="static site, CMS, React, Gatsby"
        viewport="width=device-width,initial-scale=1.0,maximum-scale=1"
      />
      <link rel="icon" href={favicon} type="image/x-icon" />
    </Helmet>
    <Notification />
    <AccountButton />
    <Loader />

    <div className="page-wrapper">

      <Navigation />
      <Fragment>{props.children}</Fragment>
      <Footer />

      <div className="scroll-top"><a className="smoothscroll" href="#top"><i className="flaticon-upload"></i></a></div>

    </div>
  </div>
);

export default withRoot(DefaultLayout);