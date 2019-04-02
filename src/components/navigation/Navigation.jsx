import React from "react";
import { Link } from "gatsby";

const styles = {
  button: {
    padding: '6px 25px',
  },
  fullWidth: {
    width: '100%'
  }
}


const Navigation = (props) => {
  const menuItems = props.menuItems ? props.menuItems : []
  return (
    <header id="site-header" className="header">
      <div id="header-wrap">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <nav className="navbar navbar-expand-lg">
                <a className="navbar-brand logo" href="index.html">
                  <img id="logo-img" className="img-center" src="images/logo.png" alt="" />
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation"> <span></span>
                  <span></span>
                  <span></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                  <ul className="navbar-nav ml-auto mr-auto">
                    <li className="nav-item dropdown" data-toggle="hover"> <a className="nav-link active dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Home</a>
                      <div className="dropdown-menu">
                        <ul className="list-unstyled">
                          <li><a href="index.html">Home 1</a>
                          </li>
                          <li><a href="index-2.html">Home 2</a>
                          </li>
                          <li><a href="index-3.html">Home 3</a>
                          </li>
                          <li><a href="index-4.html">Home 4</a>
                          </li>
                          <li><a href="index-5.html">Home 5</a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="nav-item dropdown" data-toggle="hover"> <a className="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Pages</a>
                      <div className="dropdown-menu">
                        <ul className="list-unstyled">
                          <li><a href="about-us.html">About Us 1</a>
                          </li>
                          <li><a href="about-us-2.html">About Us 2</a>
                          </li>
                          <li><a href="team.html">Team</a>
                          </li>
                          <li><a href="team-single.html">Team Single</a>
                          </li>
                          <li><a href="faq.html">Faq</a>
                          </li>
                          <li className="dropdown dropdown-submenu" data-toggle="hover"> <a href="#" className="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          Case Studies
                        </a>
                            <ul className="dropdown-menu">
                              <li><a href="case-studies-grid-2.html">Case Studies Column 2</a>
                              </li>
                              <li><a href="case-studies-grid-3.html">Case Studies Column 3</a>
                              </li>
                              <li><a href="case-studies-fullwidth.html">Case Studies FullWidth</a>
                              </li>
                              <li><a href="case-studies-single.html">Case Studies Single</a>
                              </li>
                            </ul>
                          </li>
                          <li className="dropdown dropdown-submenu" data-toggle="hover"> <a href="#" className="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          feature
                        </a>
                            <ul className="dropdown-menu">
                              <li><a href="shortcode-accordions.html">Accordion</a>
                              </li>
                              <li><a href="shortcode-blog-post.html">Blog Post</a>
                              </li>
                              <li><a href="shortcode-counter.html">Counter</a>
                              </li>
                              <li><a href="shortcode-feature-box.html">Featured Box</a>
                              </li>
                              <li><a href="shortcode-pricing.html">Pricing Table</a>
                              </li>
                              <li><a href="shortcode-team.html">Team</a>
                              </li>
                              <li><a href="shortcode-testimonial.html">Testimonials</a>
                              </li>
                            </ul>
                          </li>
                          <li><a href="coming-soon.html">Coming Soon</a>
                          </li>
                          <li><a href="error-404.html">Error 404</a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="nav-item dropdown" data-toggle="hover"> <a className="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Services</a>
                      <div className="dropdown-menu">
                        <ul className="list-unstyled">
                          <li><a href="service.html">Service 1</a>
                          </li>
                          <li><a href="service-2.html">Service 2</a>
                          </li>
                          <li><a href="service-single.html">Service Single</a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="nav-item dropdown" data-toggle="hover"> <a className="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Project</a>
                      <div className="dropdown-menu">
                        <ul className="list-unstyled">
                          <li><a href="project-grid-2.html">Project Grid 2</a>
                          </li>
                          <li><a href="project-grid-3.html">Project Grid 3</a>
                          </li>
                          <li> <a href="project-fullwidth.html">Project FullWidth</a>
                          </li>
                          <li> <a href="project-details.html">Project Details</a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="nav-item dropdown" data-toggle="hover"> <a className="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">News</a>
                      <div className="dropdown-menu">
                        <ul className="list-unstyled">
                          <li><a href="blog-classic.html">Blog Classic</a>
                          </li>
                          <li><a href="blog-grid-2.html">Blog Grid 2</a>
                          </li>
                          <li><a href="blog-grid-3.html">Blog Grid 3</a>
                          </li>
                          <li><a href="blog-left-sidebar.html">Blog left sidebar</a>
                          </li>
                          <li><a href="blog-right-sidebar.html">Blog right sidebar</a>
                          </li>
                          <li><a href="blog-details.html">Blog Single</a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="nav-item dropdown" data-toggle="hover"> <a className="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Contact</a>
                      <div className="dropdown-menu">
                        <ul className="list-unstyled">
                          <li><a href="contact.html">Contact us 1</a>
                          </li>
                          <li><a href="contact-2.html">Contact us 2</a>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="right-nav align-items-center d-flex justify-content-end list-inline"> <a className="btn btn-white btn-sm" href="login.html">Login</a>
                  <div className="search">
                    <div className="search-content">
                      <div className="search-button"> <i className="fas fa-search"></i>
                      </div>
                      <form id="search-form" className="search-form">
                        <input type="search" className="search-input" placeholder="Search Here..." />
                      </form>
                    </div>
                  </div> <a href="#" className="ht-nav-toggle"><span></span></a>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navigation;
