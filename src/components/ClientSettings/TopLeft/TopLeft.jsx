import "./TopLeft.scss";
import { useEffect, useState } from "react";

const ClientSettingTopLeft = (args) => {
  let data = args.data;
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    setUserData(data);
  }, [data]);
  
  return (
    <div className="settings-top-left">
      {userData.map((userData) => (
        <div className="account-details">
          <div className="background-image-wrapper">
            <img
              src={`http://127.0.0.1:8000/images/profile/${userData.prof_pic}`}
              alt="preview"
              className="background-image"
            />
          </div>
          <div className="image-wrapper">
            <img
              src={`http://127.0.0.1:8000/images/profile/${userData.prof_pic}`}
              alt="preview"
              className="image"
            />
          </div>
          <div
            className={`status-wrapper ${
              userData.isOnline === 1 ? "online" : "offline"
            }`}
          >
            <span className="satus">
              {userData.isOnline === 1 ? "Online" : "Offline"}
            </span>
          </div>
          <div className="name-wrapper">
            <span className="name">{`${userData.f_name} ${userData.l_name}`}</span>
            <span className="userID">{userData.userID}</span>
          </div>
          <div className="email-wrapper">
            <span className="email">{userData.email}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ClientSettingTopLeft;
