import { useEffect, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import "./rightTop.scss";
import axios from "axios";
import moment from "moment";
const ProfileRightTop = (data) => {
  const [userData, setUserData] = useState([]);
  const [response, setResponse] = useState("");

  useEffect(() => {
    if (data !== null) {
      setUserData(data.data);
    }
  }, [data]);

  // allows the the object to be edited by the user
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };
  const handleSaveChanges = async () => {
    let data = {
      userID: userData.userID,
      birthDate: userData.birthDate,
      address: userData.address,
    };
    try {
      const API = await axios.post(
        "http://127.0.0.1:8000/api/personal-Info-Other-Update/",
        data
      );
      setResponse(API.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const formattedDate = (data) => {
    let date;
    if (data !== null) {
      date = moment(data).format("YYYY-MM-DD");
      return date;
    }
    return "No Date";
  };

  return (
    <div className="right-top-container">
      <div className="title-wrapper">
        <h1 className="title">Other Personal Information</h1>
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
        <div className="left">
          <div className="details">
            <span className="details-indicator">Birth Day</span>
            <input
              type="date"
              className="value"
              name="birthDate"
              value={`${userData.birthDate !== null ? userData.birthDate : 0}`}
              onChange={handleInputChange}
            />
          </div>
          <div className="details">
            <span className="details-indicator">Address</span>
            <input
              type="text"
              className="value"
              name="address"
              value={`${
                userData.address !== null
                  ? userData.address
                  : "No Address Added."
              }`}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="right">
          <div className="details">
            <span className="details-indicator">Date Created</span>
            <input
              type="text"
              className="value"
              disabled="true"
              value={formattedDate(userData.created_at)}
            />
          </div>
          <div className="details">
            <span className="details-indicator">Date Updated</span>
            <input
              type="text"
              className="value"
              disabled="true"
              value={formattedDate(userData.updated_at)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileRightTop;
