import "./client_sidebar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import DeliveryDiningOutlinedIcon from "@mui/icons-material/DeliveryDiningOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const ClientSideBar = () => {
  const history = useHistory();
  const navLink = (link) => {
    history.push(link);
  };
  return (
    <div className="clientSideBar">
      <div className="top">
        <span className="logo">Braddex-logo</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <div
              className="sidebarLink"
              onClick={() => navLink("/client-home")}
            >
              <HomeOutlinedIcon className="icon" />
              <span>Home</span>
            </div>
          </li>
          <li>
            <div
              className="sidebarLink"
              onClick={() => navLink("/client-Menu")}
            >
              <MenuBookOutlinedIcon className="icon" />
              <span>Menu</span>
            </div>
          </li>
          <li>
            <div
              className="sidebarLink"
              onClick={() => navLink("/client-cart")}
            >
              <ShoppingCartOutlinedIcon className="icon" />
              <span>Cart</span>
            </div>
          </li>
          <li>
            <div
              className="sidebarLink"
              onClick={() => navLink("/client-delivery")}
            >
              <DeliveryDiningOutlinedIcon className="icon" />
              <span>Delivery</span>
            </div>
          </li>
          <li>
            <div
              className="sidebarLink"
              onClick={() => navLink("/client-history")}
            >
              <ListOutlinedIcon className="icon" />
              <span>History</span>
            </div>
          </li>
          <p className="title">SETTINGS</p>
          <li>
            <div
              className="sidebarLink"
              onClick={() => navLink("/client-settings")}
            >
              <SettingsRoundedIcon className="icon" />
              <span>Settings</span>
            </div>
          </li>
          <li>
            <div
              className="sidebarLink"
              onClick={() => navLink("/client-privacy")}
            >
              <ShieldRoundedIcon className="icon" />
              <span>Privacy</span>
            </div>
          </li>
          <p className="title">OTHERS</p>
          <li>
            <div
              className="sidebarLink"
              onClick={() => navLink("/client-about")}
            >
              <InfoRoundedIcon className="icon" />
              <span>About</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default ClientSideBar;
