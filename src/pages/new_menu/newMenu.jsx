import "./newMenu.scss";
import NavBar from "../../components/navBar/nav_bar";
import SideBar from "../../components/sideBar/side_bar";

const NewMenu = () => {
    return(
        <div className="newMenu">
            <SideBar/>
            <div className="newMenuContainer">
                <NavBar/>
            </div>
        </div>
    )
}
export default NewMenu;