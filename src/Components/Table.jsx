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
      localData.map((userObject) => {
        if (userObject.id === receivedId) {
          userObject.isActivate = !userObject.isActivate;
        }
      });
      setLocalStorage("usersData", localData);
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
        <i class="fa-solid fa-arrow-left"></i> Go to registration Page
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
                <tr
                  key={userObject.id}
                  style={{
                    pointerEvents: !userObject.isActivate ? "auto" : " none",
                    // background: userObject.isActivate ? "red" : "#fff",
                  }}
                >
                  <td>{userObject.name}</td>
                  <td>{userObject.email}</td>
                  <td>{userObject.mobile}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(userObject.id)}
                      className="m-2 btn btn-secondary"
                    >
                      Edit
                    </button>
                    <button
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
                      DeActivate
                    </button>
                    {userObject.isActivate && (
                      <span>
                        <i class="bi bi-check2-all"></i>
                      </span>
                    )}
                  </td>
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
