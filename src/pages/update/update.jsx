import "./udpate.scss";
import SideBar from "../../components/sideBar/side_bar";
import NavBar from "../../components/navBar/nav_bar";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const UpdateMenu = () => {
    const { menuID } = useParams();
    return(
        <div className="updateMenu">
            <SideBar/>
            <div className="updateMenuContainer">
                <NavBar/>
                <div className="details-container">
                    <h1>{menuID}</h1>
                </div>
            </div>
        </div>
    )
}
export default UpdateMenu;