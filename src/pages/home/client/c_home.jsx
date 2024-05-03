import "./c_home.scss";
import ClientNavbar from "../../../components/client/navBar/client_navBar";
import ClientSideBar from "../../../components/client/sideBar/client_sidebar";

const ClientHome = () => {
  return (
    <div className="clientHome">
      <ClientSideBar />
      <div className="clientHomeContianer">
        <ClientNavbar />
        <div className="content">
          <div className="top">
            <h1 className="pagetitle">Home</h1>
            <img src="#" alt="image" />
          </div>
          <div className="bottom">
            <h1 className="containerTitle">Best Selling</h1>
            <div className="bottomContainer">
              <div className="cards">
                <img src="#" alt="image" className="image" />
                <p className="itemName">Name</p>
                <p className="itemPice">Price</p>
              </div>
              <div className="cards">
                <img src="#" alt="image" className="image" />
                <p className="itemName">Name</p>
                <p className="itemPice">Price</p>
              </div>
              <div className="cards">
                <img src="#" alt="image" className="image" />
                <p className="itemName">Name</p>
                <p className="itemPice">Price</p>
              </div>
              <div className="cards">
                <img src="#" alt="image" className="image" />
                <p className="itemName">Name</p>
                <p className="itemPice">Price</p>
              </div>
              <div className="cards">
                <img src="#" alt="image" className="image" />
                <p className="itemName">Name</p>
                <p className="itemPice">Price</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ClientHome;
