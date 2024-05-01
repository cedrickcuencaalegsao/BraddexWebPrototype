import './delivery.scss';
import ClientSideBar from '../../../components/client/sideBar/client_sidebar';
import ClientNavBar from '../../../components/client/navBar/client_navBar';

const ClientDelivery = () => {
    return (
        <div className="clientDeliver">
            <ClientSideBar/>
            <div className="clientDeliveryContainer">
                <ClientNavBar/>
                <h1>Delivery</h1>
            </div>
        </div>
    )
}
export default ClientDelivery;