import React from "react";

import { navigate } from "gatsby";

import PTCLogo from "../assets/images/ptc_logo.svg";
import Layout from '../layouts/default';
import bg06 from "../assets/images/bg/06.png";

import "../assets/css/connect-me.css"

export default function Entry() {

  const onClick = (url) => {
    navigate(url);
  };

  return (
    <Layout title={'ConnectMe'}>
      <section className="fullscreen-banner p-0 o-hidden text-center white-overlay error-page" data-bg-img={ bg06 } data-overlay="9">
        <div className="align-center">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center text-black">
                <h4>Looking for safe and culturally competent care for yourself or a loved one? <br />
                  ConnectMe links Black children and youth to nearby mental health services.</h4>
                <br />
                <button className="choiceButton" onClick={() => onClick("/search/")} >Help me find resources.</button>
                <br />
                <button className="choiceButton" onClick={() => onClick("/results/")}>Show me everything.</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}