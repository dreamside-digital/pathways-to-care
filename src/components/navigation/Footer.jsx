import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";
import MailchimpSubscriptionForm from "../common/MailchimpSubscriptionForm"


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

                  <div className="col-lg-4 col-md-6 sm-mt-5">
                    <h4 className="title">Pathways to Care</h4>
                    <ul className="media-icon list-unstyled text-white">
                      <li>
                        <div dangerouslySetInnerHTML={ {__html: address} } />
                      </li>
                      <li><a className="text-white" href={content.email ? content.email.link : ""}>{content.email ? content.email.anchor : "Set an email address on the contact page"}</a>
                      </li>
                      <li>
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
          </footer>
        )}
      }
    />
  );
}

export default Footer;
