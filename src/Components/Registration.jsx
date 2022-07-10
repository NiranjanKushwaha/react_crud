import React, { useState, useEffect } from "react";
import { getLocalStorage, setLocalStorage } from "./Common.service";
import { useNavigate } from "react-router-dom";
import "./registration.css";

const Registration = ({ editData }) => {
  const [localData, setLocalData] = useState([]);
  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (editData && Object.values(editData).some((el) => el !== "")) {
      setUserDetails(editData);
      setIsEditEnabled(true);
    }
    setLocalData(getLocalStorage("usersData"));
  }, [editData]);

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
    emptyUserObject();
  };

  const gotoUsersPage = () => {
    /*global event, fdescribe*/
    /*eslint no-restricted-globals: ["error", "event", "fdescribe"]*/
    if (userDetails && Object.values(userDetails).some((el) => el !== "")) {
      const msg =
        "Changes has not been registered\n You still want to proceed?";
      if (confirm(msg) === true) {
        emptyUserObject();
        navigate("/show");
      }
    } else {
      emptyUserObject();
      navigate("/show");
    }
  };

  const saveEditedDetails = (userId) => {
    if (localData && localData.length) {
      const matchingIndex = localData.findIndex((el) => el.id === userId);
      if (matchingIndex > -1) {
        localData.splice(matchingIndex, 1, userDetails);
        setLocalStorage("usersData", localData);
        alert("userDetails updated successfully");
        navigate("/show");
      } else {
        alert("Can't update, Something went wrong");
      }
    }
  };

  const emptyUserObject = () => {
    setUserDetails({
      name: "",
      email: "",
      mobile: "",
    });
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
                id="mob"
                name="mobile"
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                placeholder="Please Enter Your Mobile Number"
                value={userDetails.mobile}
                onChange={handleChange}
                className="form-contol"
              />
            </div>
            <div className="form-group mt-3">
              <button
                className="m-2 btn btn-info"
                type="button"
                onClick={emptyUserObject}
              >
                <i className="fa-solid fa-eraser"></i>
              </button>
              {!isEditEnabled && (
                <button className="m-2 btn btn-primary" type="submit">
                  Submit
                </button>
              )}
              {isEditEnabled && (
                <button
                  className="m-2 btn btn-primary"
                  type="button"
                  onClick={() => saveEditedDetails(userDetails.id)}
                >
                  Edit
                </button>
              )}
              <button
                onClick={gotoUsersPage}
                type="button"
                className="m-2 btn btn-info"
              >
                View all users data{" "}
                <i className="fa-solid fa-square-arrow-right"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Registration;
