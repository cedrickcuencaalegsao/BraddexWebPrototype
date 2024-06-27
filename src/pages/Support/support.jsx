import React from "react";
import './support.scss';
import ClientNavBar from "../../components/client/navBar/client_navBar";
import ClientSideBar from "../../components/client/sideBar/client_sidebar";

const ClientSupport = () => {
    return(
        <div className="support">
            <ClientSideBar/>
            <div className="supportContainer">
                <ClientNavBar/>
                <h1>Support</h1>
            </div>
        </div>
    )
}

export default ClientSupport;