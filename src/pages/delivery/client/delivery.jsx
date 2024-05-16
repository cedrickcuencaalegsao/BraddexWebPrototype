import "./delivery.scss";
import ClientSideBar from "../../../components/client/sideBar/client_sidebar";
import ClientNavBar from "../../../components/client/navBar/client_navBar";
import ClientWidgets from "../../../components/client/page_title_widgets/client_widgets";

const ClientDelivery = () => {
  return (
    <div className="clientDeliver">
      <ClientSideBar />
      <div className="clientDeliveryContainer">
        <ClientNavBar />
        <div className="top">
          <ClientWidgets type="delivery" />
        </div>
        <div className="bottom">
            test
        </div>
      </div>
    </div>
  );
};
export default ClientDelivery;
