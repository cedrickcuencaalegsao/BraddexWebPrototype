import './settings.scss';
import ClientNavBar from "../../components/client/navBar/client_navBar";
import ClientSideBar from "../../components/client/sideBar/client_sidebar";

const ClientSettings = () => {
    return(
        <div className="settings">
            <ClientSideBar/>
            <div className="settingsContainer">
                <ClientNavBar/>
                <h1>Settings</h1>
            </div>
        </div>
    )
}
export default ClientSettings;