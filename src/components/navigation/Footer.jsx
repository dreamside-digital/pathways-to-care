import React from "react";
import { Link } from "gatsby";


const Footer = (props) => {

  return (
    <footer className="footer white-bg pos-r o-hidden bg-contain" data-bg-img="images/pattern/01.png">
      <div className="primary-footer">
        <div className="container py-5">
          <div className="row">

            <div className="col-lg-4 col-md-6 sm-mt-5">
              <h4 className="title">Pathways to Care</h4>
              <ul className="media-icon list-unstyled">
                <li>
                  <p className="mb-0">123 Spadina Ave, Toronto, ON</p>
                </li>
                <li><a href="mailto:hello@pathwaystocare.org">hello@pathwaystocare.org</a>
                </li>
                <li><a href="tel:+16471234567">(647) 123-4567</a>
                </li>
                <li><a href="tel:+16479876543">(647) 987-6543</a>
                </li>
              </ul>
            </div>

            <div className="col-lg-8 col-md-12 mr-auto">
              <div className="align-items-center white-bg box-shadow px-3 py-3 radius d-md-flex justify-content-between">
                <h4 className="mb-0">Subscribe</h4>
                <div className="subscribe-form sm-mt-2">
                  <form id="mc-form" className="group">
                    <input type="email" name="EMAIL" className="email" id="mc-email" placeholder="Email Address" required="" />
                    <input className="btn btn-theme" type="submit" name="subscribe" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
