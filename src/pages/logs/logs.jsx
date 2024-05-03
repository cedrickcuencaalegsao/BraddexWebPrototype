import "./logs.scss";
import SideBar from "../../components/sideBar/side_bar";
import NavBar from "../../components/navBar/nav_bar";

const Logs = () => {
   return(
      <div className="logs">
         <SideBar/>
         <div className="logContainer">
            <NavBar/>
         </div>
      </div>
   )
}
export default Logs;