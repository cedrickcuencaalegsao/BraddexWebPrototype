import React from "react";
import "./notif.scss";
import ClientSideBar from "../../../components/client/sideBar/client_sidebar";
import ClientNavBar from "../../../components/client/navBar/client_navBar";

const ClientNotification = () => {
  return(
    <div className="notificaton">
      <ClientSideBar/>
      <div className="notification-container">
        <ClientNavBar/>
        <div className="top">
          <div className="title">
            <h1>Latest</h1>
          </div>
          <div className="notification-list">
            notification list
          </div>
        </div>
        <div className="center">
          <div className="title">
            <h1>Earlier</h1>
          </div>
          <div className="notification-list">
            notification list
          </div>
        </div>
        <div className="bottom">
          <div className="title">
            <h1>All</h1>
          </div>
          <div className="notification-list">
            notification list
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientNotification;
