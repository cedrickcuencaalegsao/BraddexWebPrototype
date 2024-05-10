import "./cart.scss";
import ClientSideBar from "../../components/client/sideBar/client_sidebar";
import ClientNavBar from "../../components/client/navBar/client_navBar";

const Cart = () => {
  return (
    <div className="cart">
      <ClientSideBar />
      <div className="cartContainer">
        <ClientNavBar />
        <div className="top">
          <div className="title">
            <h1>Cart</h1>
          </div>
        </div>
        <div className="bottom">
          <div className="table-carts">
            <div className="cart-cards">
                <p>cart-cards</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart;
