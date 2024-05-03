import "./profile.scss";
import SideBar from "../../../components/sideBar/side_bar";
import NavBar from "../../../components/navBar/nav_bar";

const AdminProfile = () => {
   return(
      <div className="profile">
         <SideBar/>
         <div className="profileContainer">
            <NavBar/>
         </div>
      </div>
   )
}
export default AdminProfile;