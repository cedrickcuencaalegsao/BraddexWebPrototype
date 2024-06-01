import axios from "axios";
import "./tightCenter.scss";
import { useEffect, useState } from "react";

const ProfileRightCenter = (data) => {
  const [userUUID, setUserUUID] = useState("");
  const [dbData, setDBData] = useState([]);

  useEffect(() => {
    if (data !== null) {
      setUserUUID(data.data.userID);
    }
  }, [data]);

  const getUserDBDataAPI = async (data) => {
    try {
      const API = await axios.get(
        `http://127.0.0.1:8000/api/get-user-db-data/${data}`
      );
      setDBData(API.data);
    } catch (error) {
      console.log(error);
    }
    console.log(data);
  };

  useEffect(() => {
    if (userUUID != 0 || userUUID !== null) {
      getUserDBDataAPI(userUUID);
    }
  }, [userUUID]);

  console.log(dbData);

  return (
    <div className="right-center-container">
      <div className="title-wrapper">
        <h1 className="title">Order, Cart, and Delivery Overview</h1>
      </div>
    </div>
  );
};
export default ProfileRightCenter;
