import "./delivery.scss";
import SideBar from "../../components/sideBar/side_bar";
import NavBar from "../../components/navBar/nav_bar";
import DeliveryList from "../../components/deliverylist/deliverylist";

const Delivery = () => {
    return(
        <div className="delivery">
            <SideBar/>
            <div className="deliveryContainer">
                <NavBar/>
                <div className="table">
                    <DeliveryList/>
                </div>
            </div>
        </div>
    )
}
export default Delivery