import React, { useState, useEffect } from "react";
import { getLocalStorage, setLocalStorage } from "./Common.service";
import { useNavigate } from "react-router-dom";
import "./registration.css";

const Registration = () => {
  const [localData, setLocalData] = useState([]);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    setLocalData(getLocalStorage("usersData"));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    userDetails["id"] = new Date().getTime().toString();
    userDetails["isActivate"] = true;
    console.log(userDetails);
    const isUserAlreadyExists = localData.some(
      (el) => el.email.toLowerCase() === userDetails?.email.toLowerCase()
    );
    if (localData.length && !isUserAlreadyExists) {
      const oldDataWithNewData = [...localData, userDetails];
      setLocalData(oldDataWithNewData);
      setLocalStorage("usersData", oldDataWithNewData);
      alert("registration done successfully");
    } else {
      if (!localData.length) {
        const oldDataWithNewData = [...localData, userDetails];
        setLocalStorage("usersData", oldDataWithNewData);
        setLocalData(oldDataWithNewData);
        alert("registration done successfully");
      } else {
        alert("User Already Exists with same email");
      }
    }
    setUserDetails({
      name: "",
      email: "",
      mobile: "",
    });
  };

  const gotoUsersPage = () => {
    navigate("/show");
  };
  return (
    <>
      <div className="card">
        <div className="card-title bg-primary text-light">
          <h4>User Registration Page</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nm">Name</label>
              <br />
              <input
                type="text"
                id="nm"
                name="name"
                placeholder="Please Enter Your Name"
                value={userDetails.name}
                onChange={handleChange}
                className="form-contol"
              />
            </div>
            <div className="form-group">
              <label htmlFor="em">Email</label>
              <br />
              <input
                type="email"
                id="em"
                name="email"
                placeholder="Please Enter Your Email"
                value={userDetails.email}
                onChange={handleChange}
                className="form-contol"
              />
            </div>
            <div className="form-group">
              <label htmlFor="mob">Mobile</label>
              <br />
              <input
                type="number"
                id="mob"
                name="mobile"
                placeholder="Please Enter Your Mobile Number"
                value={userDetails.mobile}
                onChange={handleChange}
                className="form-contol"
              />
            </div>
            <div className="form-group mt-3">
              <button className="m-2 btn btn-primary">Submit</button>
              <button onClick={gotoUsersPage} className="m-2 btn btn-info">
                All users Data
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Registration;
