import React from "react";
import notFoundImage from "../images/pageNotFound.jpeg";
import { useNavigate } from "react-router-dom";
const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div style={{ backgroundImage: `url(${notFoundImage})` }}>
      <span
        className="gotoLink m-2 btn btn-info"
        onClick={() => navigate("/show")}
      >
        <i className="fa-solid fa-arrow-left"></i> Go to Listing Page
      </span>
      <img src={notFoundImage} alt="Page Not Found" />
    </div>
  );
};

export default PageNotFound;
