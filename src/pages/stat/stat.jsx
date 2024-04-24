import "./stat.scss";
import SideBar from "../../components/sideBar/side_bar";
import NavBar from "../../components/navBar/nav_bar";

const StatList = () => {
    return(
        <div className="statList">
            <SideBar/>
            <div className="statContainer">
                <NavBar/>
            </div>
        </div>
    )
}

export default StatList
