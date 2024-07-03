import "./side_bar.scss";
import { Dashboard } from "@mui/icons-material";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ListIcon from "@mui/icons-material/List";
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

  const handleClick = (args) => {
    history.push(args);
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
            <div className="sidebarLink" onClick={() => handleClick("/home")}>
              <Dashboard className="icon" />
              <span>DashBoard</span>
            </div>
          </li>
          <p className="title">LIST</p>
          <li>
            <div className="sidebarLink" onClick={() => handleClick("/users")}>
              <Person2OutlinedIcon className="icon" />
              <span>User</span>
            </div>
          </li>
          <li>
            <div className="sidebarLink" onClick={() => handleClick("/cart")}>
              <ShoppingCartOutlinedIcon className="icon" />
              <span>Cart</span>
            </div>
          </li>
          <li>
            <div
              className="sidebarLink"
              onClick={() => handleClick("/products")}
            >
              <Inventory2OutlinedIcon className="icon" />
              <span>Menu</span>
            </div>
          </li>
          <li>
            <div className="sidebarLink" onClick={() => handleClick("/orders")}>
              <CreditCardOutlinedIcon className="icon" />
              <span>Orders</span>
            </div>
          </li>
          <li>
            <div
              className="sidebarLink"
              onClick={() => handleClick("/delivery")}
            >
              <LocalShippingOutlinedIcon className="icon" />
              <span>Delivery</span>
            </div>
          </li>
          <li>
            <div className="sidebarLink" onClick={() => handleClick("/inventory" )}>
              <ListIcon className="icon" />
              <span>Inventory</span>
            </div>
          </li>
          <p className="title">USEFUL</p>
          <li>
            <div
              className="sidebarLink"
              onClick={() => handleClick("/statistics")}
            >
              <QueryStatsOutlinedIcon className="icon" />
              <span>Stats</span>
            </div>
          </li>
          <li>
            <div
              className="sidebarLink"
              onClick={() => handleClick("/newmenu")}
            >
              <AppRegistrationOutlinedIcon className="icon" />
              <span>New Menu</span>
            </div>
          </li>
          <p className="title">USER</p>
          <li>
            <div className="sidebarLink" onClick={() => handleClick("/profile")}>
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
