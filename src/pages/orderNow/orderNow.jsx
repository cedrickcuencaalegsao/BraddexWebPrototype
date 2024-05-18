import "./orderNow.scss";
import ClientSideBar from "../../components/client/sideBar/client_sidebar";
import ClientNavBar from "../../components/client/navBar/client_navBar";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";

const ClientOrderNow = () => {
  const menuID = useParams();
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState([]);

  const getOrderNowMenuAPI = async () => {
    try {
      const API = await axios.get(
        `http://127.0.0.1:8000/api/get-order-now-menu/${menuID.menuID}`
      );
      return API.data.menu;
    } catch (error) {
      console.log(error);
    }
  };

  const onload = async () => {
    const data = await getOrderNowMenuAPI();
    setMenu(data);
    setLoading(false);
  };
  console.log(menu);
  return (
    <div className="order-now" onLoad={() => onload()}>
      <ClientSideBar />

      <div className="order-now-container">
        <ClientNavBar />
        <div className="progress">
          {loading ? (
            <div className="loading">
              <LinearProgress
                sx={{
                  bgcolor: "lightgray",
                  "& .MuiLinearProgress-bar": { bgcolor: "orangered" },
                }}
              />
            </div>
          ) : (
            <div className="loading"></div>
          )}
        </div>
        <div className="data-page-container">
          <div className="page-title-container">
            <h1 className="page-title">Order Menu</h1>
          </div>
          <div className="menu-form">
            <div className="left-container">
              <div className="image-wrapper">
                <img
                  src={`http://127.0.0.1:8000/images/menu/${menu.image}`}
                  alt="image"
                  className="image"
                />
              </div>
              <div className="menu-small-detials-container">
                <div className="menu-name-container">
                  <span className="menu-name-indicator">Menu Name:</span>
                  <h1 className="menu-name-value">{menu.menu_name}</h1>
                </div>
                <div className="menu-price-container">
                  <span className="menu-price-idicator">Menu Price:</span>
                  <h1>{`₱.${menu.price}`}</h1>
                </div>
              </div>
            </div>
            <div className="right-container">
              <div className="right-title-container">
                <h1 className="right-title">Order Details</h1>
              </div>
              <div className="order-details-container">
                <div className="details-cotainer">
                  <div className="quantity-container">quantity</div>
                  <div className="total-ammount-container">total ammount</div>
                </div>
                <div className="qrimage-container">
                  QRimage
                </div>
              </div>
              <div className="click-to-order-container">
                click to order
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ClientOrderNow;
