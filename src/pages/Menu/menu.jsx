import './menu.scss';
import ClientNavBar from "../../components/client/navBar/client_navBar";
import ClientSideBar from "../../components/client/sideBar/client_sidebar";

const ClientMenu = () => {
    return(
        <div className="menu">
            <ClientSideBar/>
            <div className="menuContianer">
                <ClientNavBar/>
                <h1>Menu</h1>
            </div>
        </div>
    )
}

export default ClientMenu;