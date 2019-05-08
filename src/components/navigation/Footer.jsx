import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";


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
          <footer className="footer white-bg pos-r o-hidden bg-contain" data-bg-img="images/pattern/01.png">
            <div className="primary-footer">
              <div className="container py-5">
                <div className="row">

                  <div className="col-lg-4 col-md-6 sm-mt-5">
                    <h4 className="title">Pathways to Care</h4>
                    <ul className="media-icon list-unstyled">
                      <li>
                        <div dangerouslySetInnerHTML={ {__html: address} } />
                      </li>
                      <li><a href={content.email ? content.email.link : ""}>{content.email ? content.email.anchor : "Set an email address on the contact page"}</a>
                      </li>
                      <li>
                        <div dangerouslySetInnerHTML={ {__html: phone} } />
                      </li>
                    </ul>
                  </div>

                  <div className="col-lg-8 col-md-12 mr-auto">
                    <div className="align-items-center white-bg box-shadow px-3 py-3 radius d-md-flex justify-content-between">
                      <h4 className="mb-0">Subscribe</h4>
                      <div className="subscribe-form sm-mt-2">
                        <form
                          id="mc-embedded-subscribe-form"
                          className="group validate"
                          action="https://blackhealthalliance.us20.list-manage.com/subscribe/post?u=538e030e0d8a3cbfa9fa8c536&amp;id=b902029dd6"
                          method="post"
                          name="mc-embedded-subscribe-form"
                          target="_blank"
                          novalidate
                        >
                          <div style={{position: "absolute", left: "-5000px"}} aria-hidden="true"><input type="text" name="b_538e030e0d8a3cbfa9fa8c536_b902029dd6" tabindex="-1" value="" /></div>
                          <input type="email" name="EMAIL" className="required email" id="mce-EMAIL" placeholder="Email Address" required="true" />
                          <input className="btn btn-theme" type="submit" name="subscribe" />
                        </form>
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
