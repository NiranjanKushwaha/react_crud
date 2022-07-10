import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLocalStorage } from "./Common.service";
import PageNotFound from "./PageNotFound";
import Registration from "./Registration";
const EditUserData = () => {
  const [userObject, setUserObject] = useState({});
  let { userId } = useParams();
  useEffect(() => {
    const allLocalData = getLocalStorage("usersData");
    if (allLocalData && allLocalData.length && userId >= 0) {
      const filteredData = allLocalData.filter(
        (userObj) => userObj.id === userId
      );
      if (filteredData && filteredData.length) {
        setUserObject(filteredData.shift());
      }
    }
  }, [userId]);

  return (
    <>
      {userObject && Object.values(userObject).some((el) => el !== "") && (
        <Registration editData={userObject}></Registration>
      )}
      {!(userObject && Object.values(userObject).some((el) => el !== "")) && (
        <PageNotFound></PageNotFound>
      )}
    </>
  );
};

export default EditUserData;
