import "./side_bar.scss";
import { Dashboard } from "@mui/icons-material";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AppRegistrationOutlinedIcon from "@mui/icons-material/AppRegistrationOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import axios from "axios";
const SideBar = () => {
  const history = useHistory();

  const handleLogout = async () => {
    const uuid = localStorage.getItem("uuid");
    try {
      const resp = await axios.post(`http://127.0.0.1:8000/api/logout/${uuid}`);
      console.log(resp);
      localStorage.removeItem("token");
      localStorage.removeItem("uuid");
      localStorage.removeItem("isAdmin");
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const viewHome = () => {
    history.push("/home");
  };
  const viewUsers = () => {
    history.push("/users");
  };
  const viewCart = () => {
    history.push("/cart");
  };
  const viewProducts = () => {
    history.push("/products");
  };
  const viewOrders = () => {
    history.push("/orders");
  };
  const viewDelivery = () => {
    history.push("/delivery");
  };
  const viewStats = () => {
    history.push("/statistics");
  };
  const viewNewMenu = () => {
    history.push("/newmenu");
  };
  const viewSettings = () => {
    history.push("/settings");
  };
  const viewProfile = () => {
    history.push("/profile");
  };

  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">Braddex-logo</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <div className="sidebarLink" onClick={viewHome}>
              <Dashboard className="icon" />
              <span>DashBoard</span>
            </div>
          </li>
          <p className="title">LIST</p>
          <li>
            <div className="sidebarLink" onClick={viewUsers}>
              <Person2OutlinedIcon className="icon" />
              <span>User</span>
            </div>
          </li>
          <li>
            <div className="sidebarLink" onClick={viewCart}>
              <ShoppingCartOutlinedIcon className="icon" />
              <span>Cart</span>
            </div>
          </li>
          <li>
            <div className="sidebarLink" onClick={viewProducts}>
              <Inventory2OutlinedIcon className="icon" />
              <span>Menu</span>
            </div>
          </li>
          <li>
            <div className="sidebarLink" onClick={viewOrders}>
              <CreditCardOutlinedIcon className="icon" />
              <span>Orders</span>
            </div>
          </li>
          <li>
            <div className="sidebarLink" onClick={viewDelivery}>
              <LocalShippingOutlinedIcon className="icon" />
              <span>Delivery</span>
            </div>
          </li>
          <p className="title">USEFUL</p>
          <li>
            <div className="sidebarLink" onClick={viewStats}>
              <QueryStatsOutlinedIcon className="icon" />
              <span>Stats</span>
            </div>
          </li>
          <li>
            <div className="sidebarLink" onClick={viewNewMenu}>
              <AppRegistrationOutlinedIcon className="icon" />
              <span>New Menu</span>
            </div>
          </li>
          <li></li>
          <p className="title">SERVICE</p>
          <li>
            <div className="sidebarLink" onClick={viewSettings}>
              <SettingsOutlinedIcon className="icon" />
              <span>Settings</span>
            </div>
          </li>
          <p className="title">USER</p>
          <li>
            <div className="sidebarLink" onClick={viewProfile}>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profile</span>
            </div>
          </li>
          <li>
            <div className="sidebarLink" onClick={handleLogout}>
              <LogoutOutlinedIcon className="icon" />
              <span>Logout</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
