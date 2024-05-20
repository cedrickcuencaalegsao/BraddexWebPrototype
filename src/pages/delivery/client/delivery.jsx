import "./delivery.scss";
import ClientSideBar from "../../../components/client/sideBar/client_sidebar";
import ClientNavBar from "../../../components/client/navBar/client_navBar";
import ClientWidgets from "../../../components/client/page_title_widgets/client_widgets";
import { useState, useEffect } from "react";
import axios from "axios";

const ClientDelivery = () => {
  const uuid = localStorage.getItem("uuid");
  const [data, setData] = useState([]);
  const [menu, setMenu] = useState([]);
  const [loading, setLaoding] = useState(true);

  let delivery;

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
        console.log(API.data.menu);
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

  return (
    <div className="clientDeliver">
      <ClientSideBar />
      <div className="clientDeliveryContainer">
        <ClientNavBar />
        <div className="top">
          <ClientWidgets type="delivery" />
        </div>
        <div className="bottom">
          <div className="table-container">
          </div>
        </div>
      </div>
    </div>
  );
};
export default ClientDelivery;
