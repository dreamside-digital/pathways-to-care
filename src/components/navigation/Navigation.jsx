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
    <div>
      <nav className="navbar no-margin-bottom">
        <div className="navigation-menu padding-two no-padding-top no-padding-bottom">
          <div className="row">
            <div className="col-lg-1 col-md-3 navbar-header">
              <button
                type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#bs-example-navbar-collapse-1"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
            </div>
            <div
              className="col-lg-5 col-md-6 col-sm-9 collapse navbar-collapse"
              id="bs-example-navbar-collapse-1"
              style={styles.fullWidth}
            >
              <ul className="nav navbar-nav">
                { menuItems.map(item => (
                  <li key={item.url}>
                    <Link
                      to={`${item.url}`}
                      className="inner-link text-medium"
                      data-scroll
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <Link
                    className="btn-small-white btn btn-small no-margin inner-link"
                    to="/project-form"
                  >
                    <span style={styles.button}>
                      Submit a Project
                    </span>
                  </Link>
                </li>
                <li>
                  <a
                    className="btn-small-white btn btn-small no-margin inner-link"
                    href="https://www.fundscrip.com/support-a-group/XCS92G?GUID"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span style={styles.button}>
                      Donate Now
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
