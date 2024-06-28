import "./profile.scss";
import SideBar from "../../../components/sideBar/side_bar";
import NavBar from "../../../components/navBar/nav_bar";

const AdminProfile = () => {
   return(
      <div className="admin-profile">
         <SideBar className="side-bar"/>
         <div className="admin-profile-Container">
            <NavBar className="nav-bar"/>
         </div>
      </div>
   )
}
export default AdminProfile;