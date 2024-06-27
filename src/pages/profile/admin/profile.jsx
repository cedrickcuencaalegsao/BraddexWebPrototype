import React from "react";
import "./profile.scss";
import SideBar from "../../../components/sideBar/side_bar";
import NavBar from "../../../components/navBar/nav_bar";

const AdminProfile = () => {
   return(
      <div className="admin-profile">
         <SideBar/>
         <div className="admin-profile-Container">
            <NavBar/>
         </div>
      </div>
   )
}
export default AdminProfile;