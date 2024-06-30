import "./about.scss";
import ClientNavBar from "../../components/client/navBar/client_navBar";
import ClientSideBar from "../../components/client/sideBar/client_sidebar";

const ClientAbout = () => {
  return (
    <div className="about">
      <ClientSideBar />
      <div className="aboutContainer">
        <ClientNavBar />
        <h1>About</h1>
      </div>
    </div>
  );
};
export default ClientAbout;
