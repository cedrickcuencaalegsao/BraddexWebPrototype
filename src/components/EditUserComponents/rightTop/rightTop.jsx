import { useEffect, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import "./rightTop.scss";
const ProfileRightTop = (data) => {
  const [userData, setUserData] = useState([]);

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

  console.log(userData);
  return (
    <div className="right-top-container">
      <div className="title-wrapper">
        <h1 className="title">Other Personal Information</h1>
        <div className="button-wrapper">
          <SaveIcon className="btn-save" />
        </div>
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
              value={`${
                userData.created_at !== null
                  ? userData.created_at
                  : "No Date Added."
              }`}
            />
          </div>
          <div className="details">
            <span className="details-indicator">Date Updated</span>
            <input
              type="text"
              className="value"
              disabled="true"
              value={`${
                userData.updated_at !== null
                  ? userData.updated_at
                  : "No Date Added."
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileRightTop;
