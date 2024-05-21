import "./delivery.scss";
import ClientSideBar from "../../../components/client/sideBar/client_sidebar";
import ClientNavBar from "../../../components/client/navBar/client_navBar";
import ClientWidgets from "../../../components/client/page_title_widgets/client_widgets";
import { useState, useEffect } from "react";
import axios from "axios";
import LinearProgress from "@mui/material/LinearProgress";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const ClientDelivery = () => {
  const uuid = localStorage.getItem("uuid");
  const [loading, setLaoding] = useState(true);
  const [data, setData] = useState([]);
  const [menu, setMenu] = useState([]);

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
  }, []);

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
                <div className="card-delivery" key={index}>
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
                        <CancelOutlinedIcon className="cancel-icon" />
                      </div>
                      <div className="delete-icon-conatiner">
                        <DeleteOutlineRoundedIcon className="delete-icon" />
                      </div>
                    </div>
                  </div>
                  <div className="card-center-container">
                    <div className="image-container">
                      <img
                        src={`http://127.0.0.1:8000/images/menu/${item.image}`}
                        alt="image"
                        className="image"
                      />
                    </div>
                  </div>
                  <div className="card-bottom-container">total ammount</div>
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
