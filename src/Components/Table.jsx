import React, { useEffect, useState } from "react";
import { getLocalStorage, setLocalStorage } from "./Common.service";
import { useNavigate } from "react-router-dom";

const Table = () => {
  const [localData, setLocalData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    setLocalData(getLocalStorage("usersData"));
  }, []);

  const handleDelete = (receivedId) => {
    if (receivedId >= 0) {
      const filteredData = localData.filter(
        (userObject) => userObject.id !== receivedId
      );
      if (filteredData && filteredData.length) {
        setLocalStorage("usersData", filteredData);
        setLocalData(filteredData);
        alert("user Data deleted successfully");
      }
    }
  };
  const activateToggle = (receivedId) => {
    if (receivedId >= 0) {
      let newResult = localData.map((userObject) => {
        if (userObject.id === receivedId) {
          userObject.isActivate = !userObject.isActivate;
          return userObject;
        }
        return userObject;
      });
      setLocalStorage("usersData", newResult);
      setLocalData(newResult);
    }
  };

  const handleEdit = (receivedId) => {
    if (receivedId >= 0) {
      console.log("clicked on edit button");
    }
  };

  return (
    <>
      <span
        className="gotoLink m-2 btn btn-info"
        onClick={() => navigate("/registration")}
      >
        <i className="fa-solid fa-arrow-left"></i> Go to registration Page
      </span>
      <table className="table table-hover table-dark">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {localData.length &&
            localData.map((userObject) => {
              return (
                <tr key={userObject.id}>
                  <td>{userObject.name}</td>
                  <td>{userObject.email}</td>
                  <td>{userObject.mobile}</td>
                  {
                    <td>
                      <button
                        style={{
                          pointerEvents: userObject.isActivate
                            ? "auto"
                            : " none",
                        }}
                        onClick={() => handleEdit(userObject.id)}
                        className="m-2 btn btn-secondary"
                      >
                        Edit
                      </button>
                      <button
                        style={{
                          pointerEvents: userObject.isActivate
                            ? "auto"
                            : " none",
                        }}
                        onClick={() => handleDelete(userObject.id)}
                        className="m-2 btn btn-danger"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => activateToggle(userObject.id)}
                        style={{
                          pointerEvents: "auto",
                        }}
                        className="m-2 btn btn-warning"
                      >
                        {userObject.isActivate ? "DeActivate" : "Activate"}
                      </button>

                      <button
                        disabled
                        className="m-2 btn btn-warning"
                        style={{
                          visibility: userObject.isActivate
                            ? "visible"
                            : "hidden",
                        }}
                      >
                        <i className="fa-solid fa-check-double text-white"></i>
                      </button>
                    </td>
                  }
                </tr>
              );
            })}
          {!localData.length && (
            <tr>
              <td colSpan="4">No Data Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default Table;
