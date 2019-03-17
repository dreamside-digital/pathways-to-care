import React from "react";
import Helmet from "react-helmet";
import withRoot from '../utils/withRoot';

import Notification from "../components/notifications/Notification";
import AccountButton from "../components/navigation/AccountButton"

import "../assets/sass/custom.scss";
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
        React CMS Starter
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
    <div className='page-content' style={styles.content}>{props.children}</div>
  </div>
);

export default withRoot(DefaultLayout);