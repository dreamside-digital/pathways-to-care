import React from 'react';
import { Link } from 'gatsby';

import Layout from '../layouts/default';

import bg06 from "../assets/images/bg/06.png";


const NotFoundPage = props => (
  <Layout title="Page not found">
    <section className="fullscreen-banner p-0 o-hidden text-center white-overlay error-page" data-bg-img={ bg06 } data-overlay="9">
      <div className="align-center">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center text-black">
              <h1>4<span><i>0</i></span>4</h1>
              <h5 className="mb-4 mt-3">Oops, this page doesn't seem to exist.</h5>
              <Link className="btn btn-theme btn-radius btn-iconic" to="/">
                <i className="fas fa-long-arrow-alt-left"></i><span>back to home</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Layout>
)

export default NotFoundPage
