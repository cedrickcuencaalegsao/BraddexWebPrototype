import React from "react";
import "./settings.scss";
import SideBar from "../../../components/sideBar/side_bar";
import NavBar from "../../../components/navBar/nav_bar";

const AdminSettings = () => {
   return(
      <div className="settings">
         <SideBar/>
         <div className="settingsContainer">
            <NavBar/>
         </div>
      </div>
   )
}
export default AdminSettings;