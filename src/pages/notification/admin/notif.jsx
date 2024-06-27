import React from "react";
import "./notif.scss";
import SideBar from "../../../components/sideBar/side_bar";
import NavBar from "../../../components/navBar/nav_bar";

const Notification = () => {
  return (
    <div className="notifcation">
      <SideBar />
      <div className="notifContainer">
        <NavBar />
      </div>
    </div>
  );
};

export default Notification;
