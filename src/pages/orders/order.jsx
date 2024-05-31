import "./order.scss";
import SideBar from "../../components/sideBar/side_bar";
import NavBar from "../../components/navBar/nav_bar";
import { useState, useEffect } from "react";
import TableOrder from "../../components/tableorderCompoments/tableOrder/table_order";
import axios from "axios";
import moment from "moment";
import WidgetPaid from "../../components/tableorderCompoments/orderWidgets/widgetsPaid";
import WidgetCancelled from "../../components/tableorderCompoments/orderWidgets/widgetsCancelled";
import WidgetDelivered from "../../components/tableorderCompoments/orderWidgets/widgetsDelivered";
import WidgetDeleted from "../../components/tableorderCompoments/orderWidgets/widgetsDeleted";

const OrderList = () => {
  const [order, setOrder] = useState([]);
  const [rows, setRows] = useState([]);
  const [orderCount, setOrderCount] = useState(0);
  const [paid, setPaid] = useState(0);
  const [deleted, setDeleted] = useState(0);
  const [cancelled, setCancelled] = useState(0);
  const [delivered, setDelivered] = useState(0);

  let data_paid = { count: orderCount, paid: paid };
  let data_delivered = { count: orderCount, delivered: delivered };
  let data_deleted = { count: orderCount, deleted: deleted };
  let data_cancelled = { count: orderCount, cancelled: cancelled };

  useEffect(() => {
    const getOrderData = async () => {
      try {
        const API = await axios.get("http://127.0.0.1:8000/api/get-order-data");
        setOrder(API.data.order);
        setOrderCount(API.data.countOrder);
        setPaid(API.data.paid);
        setDeleted(API.data.deleted);
        setCancelled(API.data.cancelled);
        setDelivered(API.data.delivered);
      } catch (error) {
        console.log(error);
      }
    };
    getOrderData();
    const interval = setInterval(() => {
      getOrderData();
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  // we format the createad_at and updated_at into YYY-MM-DD.
  const formattedDate = (data) => {
    if (data !== null) {
      return moment(data).format("YYYY-MM-DD");
    } else {
      return "No Date.";
    }
  };
  // creating the table rows.
  const createRows = (data) => {
    data.map((item) => {
      let newRow = {
        id: item.id,
        orderID: item.orderID,
        userID: item.orderID,
        menuID: item.menuID,
        paymentType: item.paymentType,
        userAddres: item.userAddress,
        totalAmmount: `₱ ${item.totalAmmount}.00`,
        quantity: item.quantity,
        isPaid: item.isPaid === 1 ? "Paid" : "Not Paid",
        isDeleted: item.isDeleted === 1 ? "Deleted" : "Not Deleted",
        created_at: formattedDate(item.created_at),
        updated_at: formattedDate(item.updated_at),
      };
      // check if data is already in the array if true then we update it base on the id as and index.
      const arrayIndex = rows.findIndex((rows) => rows.id === newRow.id);
      if (arrayIndex !== -1) {
        // here we update the row if the row was update over time.
        setRows((prevRow) => {
          const updatedRow = [...prevRow];
          updatedRow[arrayIndex] = newRow;
          return updatedRow;
        });
      } else {
        // if data is not on the row then we add it on our row array.
        setRows((prevRow) => [...prevRow, newRow]);
      }
    });
  };
  // id the data was change a little bit the row will updated by using useEffect and order as a dependencies.
  useEffect(() => {
    if (order.length !== 0) {
      createRows(order);
    }
  }, [order]);

  return (
    <div className="orderList">
      <SideBar />
      <div className="orderContainer">
        <NavBar />
        <div className="order-data-wrapper">
          <div className="top">
            <div className="widget-container">
              <WidgetPaid data={data_paid} />
            </div>
            <div className="widget-container">
              <WidgetCancelled data={data_cancelled} />
            </div>
            <div className="widget-container">
              <WidgetDelivered data={data_delivered} />
            </div>
            <div className="widget-container">
              <WidgetDeleted data={data_deleted} />
            </div>
          </div>
          <div className="buttom">
            <TableOrder data={rows} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
