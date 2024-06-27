import "./delivery.scss";
import ClientSideBar from "../../../components/client/sideBar/client_sidebar";
import ClientNavBar from "../../../components/client/navBar/client_navBar";
import ClientWidgets from "../../../components/client/page_title_widgets/client_widgets";
import { useState, useEffect } from "react";
import axios from "axios";
import LinearProgress from "@mui/material/LinearProgress";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const ClientDelivery = () => {
  const [data, setData] = useState([]);
  const [menu, setMenu] = useState([]);
  const [loading, setLaoding] = useState(true);
  const uuid = localStorage.getItem("uuid");

  useEffect(() => {
    const getOrderAPI = async () => {
      try {
        const API = await axios.get(
          `http://127.0.0.1:8000/api/getorder/${uuid}`
        );
        setData(API.data.data);
        setLaoding(false);
      } catch (error) {
        console.log(error);
      }
    };
    getOrderAPI();
    const interval = setInterval(() => {
      getOrderAPI();
    }, 1000);
    return () => clearInterval(interval);
  }, [uuid]);

  useEffect(() => {
    const getDeliveryMenuAPI = async (menuIDArray) => {
      try {
        const API = await axios.post(
          "http://127.0.0.1:8000/api/get-delivery-menu",
          menuIDArray
        );
        setMenu(API.data.menu);
      } catch (error) {
        console.log(error);
      }
    };

    if (data.length > 0) {
      const menuIDArray = data.map((item) => item.menuID);
      getDeliveryMenuAPI(menuIDArray);
    }
  }, [data]);

  // Flattening the nested data array
  const flatData = data.flat();

  let cardData = flatData.map((dataItem) => {
    let newMenu = menu.find((menuItem) => dataItem.menuID === menuItem.menuID);
    return { ...dataItem, ...newMenu };
  });

  const handleCancelOrder = async (menuID) => {
    let data = {
      uuID: uuid,
      menuID: menuID,
    };
    try {
      await axios.post("http://127.0.0.1:8000/api/cancel-order", data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMarkAsDelivered = async (menuID) => {
    let data = {
      uuID: uuid,
      menuID: menuID,
    };
    try {
      await axios.post("http://127.0.0.1:8000/api/user-mark-delivered", data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="clientDeliver">
      <ClientSideBar />
      <div className="clientDeliveryContainer">
        <ClientNavBar />
        <div className="top">
          <ClientWidgets type="delivery" />
        </div>
        <div className="bottom">
          <div className="bottom-title-container">
            <h3 className="bottom-title">Delivery</h3>
          </div>
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
            <div className="table-container">
              {cardData.map((item, index) => (
                <div className="card-delivery" key={index.id}>
                  <div className="card-top-container">
                    <div className="card-title-container">
                      <div className="menu-name-container">
                        <h3 className="menu-name">{item.menu_name}</h3>
                      </div>
                      <div className="menu-name-indicator-container">
                        <span className="menu-name-indicator">Menu Name</span>
                      </div>
                    </div>
                    <div className="card-icon-container">
                      <div className="cancel-icon-container">
                        <CancelOutlinedIcon
                          className="cancel-icon"
                          onClick={() => handleCancelOrder(item.menuID)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="card-center-container">
                    <div className="image-container">
                      <img
                        src={`http://127.0.0.1:8000/images/menu/${item.image}`}
                        alt="menu"
                        className="image"
                      />
                    </div>
                  </div>
                  <div className="card-bottom-container">
                    <div className="total-ammount-container">
                      <div className="total-ammount-indicator-container">
                        <span className="total-ammount-indicator">
                          Total Ammount
                        </span>
                      </div>
                      <div className="total-ammount-container">
                        <h2 className="total-ammount">{`₱ ${item.totalAmmount}.00`}</h2>
                      </div>
                    </div>
                    <div className="botton-container">
                      <button
                        className="botton-mark"
                        onClick={() => handleMarkAsDelivered(item.menuID)}
                      >
                        Delivered
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ClientDelivery;
