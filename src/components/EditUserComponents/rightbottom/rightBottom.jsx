import "./rightBottom.scss";
import SaveIcon from "@mui/icons-material/Save";
import Switch from "@mui/material/Switch";
import { useState, useEffect } from "react";
import axios from "axios";

const ProfileRightBottom = (data) => {
  const [userData, setUserData] = useState({});
  const [response, setResponse] = useState("");

  const handleInputChange = (e) => {
    const { name, checked } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: checked ? 1 : 0,
    }));
  };

  const checked = (data) => {
    return data === 1;
  };

  useEffect(() => {
    setUserData(data.data);
    checked();
  }, [data]);

  const handleSaveChanges = async () => {
    let data = {
      userID: userData.userID,
      isAdmin: userData.isAdmin,
      isActive: userData.isActive,
      isOnline: userData.isOnline,
    };
    try {
      const API = await axios.post(
        "http://127.0.0.1:8000/api/personal-Info-IsAdmin/",
        data
      );
      setResponse(API.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="right-bottom-container">
      <div className="title-wrapper">
        <h1 className="title">
          Update User Type, Deactivate or Activate, and Set Online-Offline
        </h1>
        <div className="button-wrapper">
          <SaveIcon className="btn-save" onClick={() => handleSaveChanges()} />
        </div>
      </div>
      <div className="response-container">
        <span style={{ fontSize: "15px", color: "red", marginLeft: "10px" }}>
          {response}
        </span>
      </div>
      <div className="details-wrapper">
        <div className="details">
          <span className="lable">Admin</span>
          <Switch
            className="toggle"
            checked={checked(userData.isAdmin)}
            name="isAdmin"
            onChange={handleInputChange}
          />
          <span className="desc">
            Change the account type into administrator account.
          </span>
        </div>
        <div className="details">
          <span className="lable">Active</span>
          <Switch
            className="toggle"
            checked={checked(userData.isActive)}
            name="isActive"
            onChange={handleInputChange}
          />
          <span className="desc">Deactivate or activate the account.</span>
        </div>
        <div className="details">
          <span className="lable">Online</span>
          <Switch
            className="toggle"
            checked={checked(userData.isOnline)}
            name="isOnline"
            onChange={handleInputChange}
          />
          <span className="desc">
            Change the account status offline or online.
          </span>
        </div>
      </div>
    </div>
  );
};
export default ProfileRightBottom;
