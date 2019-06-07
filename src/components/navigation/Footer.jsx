import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";

import MailchimpSubscriptionForm from "../common/MailchimpSubscriptionForm"
import otf from "../../assets/images/otf_logo.png"
import phac from "../../assets/images/phac_logo.png"



const Footer = (props) => {

  return (
    <StaticQuery
      query={graphql`
      query FooterQuery {
        pages(id: {eq: "contact"}) {
          content
        }
      }
    `}
      render={ data => {
        const content = JSON.parse(data.pages.content) || {};
        const address = content.address ? content.address.text : "Set an address on the contact page";
        const phone = content.phone ? content.phone.text : "Set a phone number on the contact page";

        return(
          <footer className="footer dark-bg pos-r o-hidden bg-contain" data-bg-img="images/pattern/01.png">
            <div className="primary-footer">
              <div className="container py-5">
                <div className="row">

                  <div className="col-lg-4 col-md-6 sm-mt-5 sm-mb-5 md-mb-5">
                    <h4 className="title">Pathways to Care</h4>
                    <ul className="media-icon list-unstyled text-white">
                      <li className="d-flex">
                          <i className="flaticon-location mr-3"></i>
                          <div dangerouslySetInnerHTML={ {__html: address} } />
                      </li>
                      <li className="d-flex">
                        <i className="flaticon-email mr-3"></i>
                        <a className="text-white" href={content.email ? content.email.link : ""}>{content.email ? content.email.anchor : "Set an email address on the contact page"}</a>
                      </li>
                      <li className="d-flex">
                        <i className="flaticon-call mr-3"></i>
                        <div dangerouslySetInnerHTML={ {__html: phone} } />
                      </li>
                    </ul>
                  </div>

                  <div className="col-lg-8 col-md-12 mr-auto">
                    <MailchimpSubscriptionForm prompt="Sign up to our mailing list and be the first to hear about our new Pathways to Care research, events, and upcoming community consultations!" />
                  </div>
                </div>
              </div>
            </div>

            <div className="secondary-footer">
              <div className="container">
                <div className="copyright">
                  <div className="row align-items-center">
                    <div className="col-lg-6">
                      <span>Copyright 2019 | Illustrations by Melisse Watson</span>
                    </div>
                    <div className="col-lg-6 text-lg-right sm-mt-2 d-block d-lg-flex align-items-center justify-content-end">
                      <div className="mr-4">Funded by</div>
                      <div>
                        <img className="mr-4" src={otf} alt="Ontario Trillium Foundation" style={{ width: '130px'}} />
                        <img src={phac} alt="Public Health Agency of Canada" style={{ width: '130px'}} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        )}
      }
    />
  );
}

export default Footer;
