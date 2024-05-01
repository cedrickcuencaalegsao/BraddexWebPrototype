import './history.scss';
import ClientNavBar from "../../components/client/navBar/client_navBar";
import ClientSideBar from "../../components/client/sideBar/client_sidebar";

const ClientHistory = () => {
    return(
        <div className="history">
            <ClientSideBar/>
            <div className="historyContianer">
                <ClientNavBar/>
                <h1>History</h1>
            </div>
        </div>
    )
}

export default ClientHistory;
