import "./leftBottom.scss";
import { useEffect, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";

const ProfileLeftBottom = (data) => {
  const [userData, setUserData] = useState({});

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

  return (
    <div className="left-bottom">
      <div className="title-wrapper">
        <h1 className="title">Personal Infomation</h1>
        <div className="button-wrapper">
          <SaveIcon className="btn-save" />
        </div>
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
