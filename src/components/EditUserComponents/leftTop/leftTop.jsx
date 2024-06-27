import React from "react";
import "./leftTop.scss";
const ProfileLeftTop = (data) => {
  let userData = data.data;
  return (
    <div className="profile-left-top">
      <div className="picture-wrapper">
        <img
          src={`http://127.0.0.1:8000/images/profile/${userData.image}`}
          alt="backgroundImage"
          className="background-image"
        />
      </div>
      <div className="image-wrapper">
        <img
          src={`http://127.0.0.1:8000/images/profile/${userData.image}`}
          alt="profilePicture"
          className="image"
        />
      </div>
      <div
        className={`status-wrapper- ${
          userData.isOnline === 1 ? "online" : "offline"
        }`}
      >
        <span className="status">
          {userData.isOnline === 1 ? "Online" : "Offline"}
        </span>
      </div>
      <div className="name-wrapper">
        <span className="name">{`${userData.firstName} ${userData.lastName}`}</span>
        <span className="userID">{userData.userID}</span>
      </div>
      <div className="email-wrapper">
        <span className="email">{userData.email}</span>
      </div>
    </div>
  );
};
export default ProfileLeftTop;
