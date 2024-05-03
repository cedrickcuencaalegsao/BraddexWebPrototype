import "./udpate.scss";
import SideBar from "../../components/sideBar/side_bar";
import NavBar from "../../components/navBar/nav_bar";

const UpdateMenu = () => {
    return(
        <div className="updateMenu">
            <SideBar/>
            <div className="updateMenuContainer">
                <NavBar/>
            </div>
        </div>
    )
}
export default UpdateMenu;