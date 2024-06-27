import React from "react";
import './privacy.scss';
import ClientNavBar from "../../components/client/navBar/client_navBar";
import ClientSideBar from "../../components/client/sideBar/client_sidebar";

const ClientPrivacy = () => {
    return(
        <div className="privacy">
            <ClientSideBar/>
            <div className="privacyContainer">
                <ClientNavBar/>
                <h1>Privacy</h1>
            </div>
        </div>
    )
}
export default ClientPrivacy;