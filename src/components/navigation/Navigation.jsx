import React from "react";
import { Link } from "gatsby";
import logo from "../../assets/images/ptc_logo.svg";

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
                <Link className="navbar-brand logo" to={"/"}>
                  <img id="logo-img" className="img-center" src={ logo } alt="Pathways to Care" />
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation"> <span></span>
                  <span></span>
                  <span></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                  <ul className="navbar-nav ml-auto">
                    <div className="nav-item">
                      <Link className="nav-link" to="/">Home</Link>
                    </div>
                    <div className="nav-item">
                      <Link className="nav-link" to="/about">About</Link>
                    </div>
                    <div className="nav-item">
                      <Link className="nav-link" to="/team">Team</Link>
                    </div>
                    <div className="nav-item">
                      <Link className="nav-link" to="/research">Research</Link>
                    </div>
                    <div className="nav-item">
                      <Link className="nav-link" to="/contact">Get Involved</Link>
                    </div>
                  </ul>
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
