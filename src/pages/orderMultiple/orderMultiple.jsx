import "./orderMultiple.scss";
import ClientSideBar from "../../components/client/sideBar/client_sidebar";
import ClientNavBar from "../../components/client/navBar/client_navBar";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";
import axios from "axios";

const ClientOrderMultiple = () => {
  const selectedItems = useParams();
  let data = selectedItems.data;
  const dataArray = data.split(",");
  console.log(dataArray);

  useEffect(() => {
    const getMultipleOrderApi = async () => {
      try {
        const API = await axios.post(
          "http://127.0.0.1:8000/api/get-multiple-order/",
          dataArray
        );
        console.log(API.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMultipleOrderApi();
    const interval = setInterval(() => {
      getMultipleOrderApi();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="order-multiple">
      <ClientSideBar />
      <div className="order-multiple-container">
        <ClientNavBar />
        <div className="top">Order Multiple</div>
      </div>
    </div>
  );
};

export default ClientOrderMultiple;
