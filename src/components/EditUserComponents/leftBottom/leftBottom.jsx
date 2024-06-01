import "./leftBottom.scss";
import { useEffect, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";

const ProfileLeftBottom = (data) => {
  const [userData, setUserData] = useState({});
  const [response, setResponse] = useState("");
  // this function is to make sure that the userdata must be change if the props is change in an instant.
  useEffect(() => {
    setUserData(data.data);
  }, [data]);

  // allows the the object to be edited by the user
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  // here we update the database if the userData is change instantly except the email(for user and account sercurity purpose).

  const handleSaveChanges = async () => {
    let data = {
      userID: userData.userID,
      f_name: userData.firstName,
      l_name: userData.lastName,
    };
    try {
      const API = await axios.post(
        "http://127.0.0.1:8000/api/personal-Info-Name-Update/",
        data
      );
      setResponse(API.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="left-bottom">
      <div className="title-wrapper">
        <h1 className="title">Personal Infomation</h1>
        <div className="button-wrapper">
          <SaveIcon className="btn-save" onClick={() => handleSaveChanges()} />
        </div>
      </div>
      <div className="response-container">
        <span style={{ fontSize: "15px", color: "red", marginLeft: "10px" }}>
          {response}
        </span>
      </div>
      <div className="detail-container">
        <div className="details-wrapper">
          <div className="indicator-wrapper">
            <span className="indicator">First Name</span>
          </div>
          <div className="input-wrapper">
            <input
              type="text"
              className="input-changes"
              name="firstName"
              value={userData.firstName}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="details-wrapper">
          <div className="indicator-wrapper">
            <span className="indicator">Last Name</span>
          </div>
          <div className="input-wrapper">
            <input
              type="text"
              className="input-changes"
              name="lastName"
              value={userData.lastName}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="details-wrapper">
          <div className="indicator-wrapper">
            <span className="indicator">Email</span>
          </div>
          <div className="input-wrapper">
            <input
              type="text"
              className="input-changes"
              name="email"
              disabled="true"
              value={userData.email}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="details-wrapper">
          <div className="indicator-wrapper">
            <span className="indicator">Phone No</span>
          </div>
          <div className="input-wrapper">
            <input
              type="text"
              className="input-changes"
              name="email"
              disabled="true"
              value={userData.phone}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileLeftBottom;
