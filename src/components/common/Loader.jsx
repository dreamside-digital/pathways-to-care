import React from "react";


const Loader = (props) => {

  return (
    <div id="ht-preloader">
      <div className="ht-loader clear-loader">
        <div className="loader-text">Loading</div>
        <div className="loader-dots"> <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}

export default Loader;
