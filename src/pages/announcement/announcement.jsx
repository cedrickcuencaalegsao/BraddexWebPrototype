import React from "react";
import './announcement.scss';   
import ClientNavBar from "../../components/client/navBar/client_navBar";
import ClientSideBar from "../../components/client/sideBar/client_sidebar";

const ClientAnnouncement = () => {
    return(
        <div className="announcement">
            <ClientSideBar/>
            <div className="announcementContainer">
                <ClientNavBar/>
                <h1>Announment</h1>
            </div>
        </div>
    )
}
export default ClientAnnouncement;