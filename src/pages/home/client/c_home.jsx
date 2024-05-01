import "./c_home.scss";
import ClientNavbar from "../../../components/client/navBar/client_navBar";
import ClientSideBar from "../../../components/client/sideBar/client_sidebar";

const ClientHome = () => {
    return(
        <div className="clientHome">
            <ClientSideBar/>
            <div className="clientHomeContianer">
                <ClientNavbar/>
                <h1>Home</h1>
            </div>
        </div>
    )
}
export default ClientHome;