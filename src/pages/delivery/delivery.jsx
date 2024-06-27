import "./delivery.scss";
import SideBar from "../../components/sideBar/side_bar";
import NavBar from "../../components/navBar/nav_bar";
import DeliveryList from "../../components/deliverylist/deliverylist";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import WidgetsDeliveryCancelled from "../../components/deliveryComponents/widgetsCancelled";
import WidgetsDeliveryNotCancelled from "../../components/deliveryComponents/widgetsNotCancelled";

const Delivery = () => {
  const [delivery, setDelivery] = useState([]);
  const [rows, setRows] = useState([]);
  const [countDelivery, setCountDelivery] = useState(0);
  const [cancelled, setCancelled] = useState(0);
  const [notCancelled, setNotCancelled] = useState(0);

  let data_cancelled = { count: countDelivery, cancelled: cancelled };
  let data_notCancelled = { count: countDelivery, notCancelled: notCancelled };

  useEffect(() => {
    const getDeliveryAPI = async () => {
      try {
        const API = await axios.get(
          "http://127.0.0.1:8000/api/get-delivery-data"
        );
        console.log(API.data);
        setDelivery(API.data.delivery);
        setCountDelivery(API.data.countDelivery);
        setCancelled(API.data.cancelled);
        setNotCancelled(API.data.notCancelled);
      } catch (error) {
        console.log(error);
      }
    };
    getDeliveryAPI();
    const interval = setInterval(() => {
      getDeliveryAPI();
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const formattedDate = (data) => {
      if (data !== null) {
        return moment(data).format("YYYY-MM-DD");
      } else {
        return "No Date.";
      }
    };
    const createRows = (data) => {
      return data.map((item) => ({
        id: item.id,
        orderID: item.orderID,
        userID: item.userID,
        menuID: item.menuID,
        paymentType: item.paymentType,
        userAddress: item.userAddress,
        totalAmmount: `₱ ${item.totalAmmount}.00`,
        quantity: item.quantity,
        isCancelled: item.isCancelled === 1 ? "Cancelled" : "Not Cancelled",
        created_at: formattedDate(item.created_at),
        updated_at: formattedDate(item.updated_at),
      }));
    };
    if (delivery) {
      const newRows = createRows(delivery);
      setRows((prevRows) => {
        const rowsMap = new Map(prevRows.map((row) => [row.id, row]));

        newRows.forEach((newRow) => {
          rowsMap.set(newRow.id, newRow);
        });

        return Array.from(rowsMap.values());
      });
    }
  }, [delivery, rows]);

  return (
    <div className="delivery">
      <SideBar />
      <div className="deliveryContainer">
        <NavBar />
        <div className="top-cotainer">
          <div className="widgets-wrapper">
            <WidgetsDeliveryNotCancelled data={data_notCancelled} />
          </div>
          <div className="widgets-wrapper">
            <WidgetsDeliveryCancelled data={data_cancelled} />
          </div>
        </div>
        <div className="button-container">
          <DeliveryList data={rows} />
        </div>
      </div>
    </div>
  );
};
export default Delivery;
