
import React from "react"

import PTCLogo from "../../assets/images/ptc_logo.svg";

export default function Banner(props) {
  return (
  <div className="banner footer">
    <img className="logo" src={PTCLogo} alt="Pathways to Care"/>
  </div>
  );
}