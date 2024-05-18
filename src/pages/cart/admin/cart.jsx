import "./cart.scss";
import SideBar from "../../../components/sideBar/side_bar";
import NavBar from "../../../components/navBar/nav_bar";

const AdminCart = () => {
  return (
    <div className="admin-cart-container">
      <SideBar />
      <div className="cart-table-container">
        <NavBar />
        <h1>cart</h1>
      </div>
    </div>
  );
};
export default AdminCart;
