import "./cart.scss";
import ClientSideBar from "../../components/client/sideBar/client_sidebar";
import ClientNavBar from "../../components/client/navBar/client_navBar";

const Cart = () => {
    return(
        <div className="cart">
            <ClientSideBar/>
            <div className="cartContainer">
                <ClientNavBar/>
                <h1>Cart</h1>
            </div>
        </div>
    )
}
export default Cart;