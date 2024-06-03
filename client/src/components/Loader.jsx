import React from "react";
import loaderGif from "../assets/images/loading.gif";
const Loader = () => {
  return (
    <div className="wrapper">
      <div className="container">
        <div className="loader">
          <img src={loaderGif} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Loader;
