import React from 'react';
import { Link } from 'gatsby';

import Layout from '../layouts/default';

import bg06 from "../assets/images/bg/06.png";


const MessageSentConfirmation = props => (
  <Layout title={'Thank you'}>
    <section className="fullscreen-banner p-0 o-hidden text-center white-overlay error-page" data-bg-img={ bg06 } data-overlay="9">
      <div className="align-center">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center text-black">
              <h2>Thank you!</h2>
              <p className="mb-4 mt-3">Your message has been sent and we will get back to you soon.</p>
              <Link className="btn btn-theme btn-radius btn-iconic" to="/">
                <i className="fas fa-long-arrow-alt-left pr-3"></i><span>back to home</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Layout>
)

export default MessageSentConfirmation
