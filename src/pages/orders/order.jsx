import "./order.scss";
import SideBar from "../../components/sideBar/side_bar";
import { useState, useEffect } from "react";
import TableOrder from "../../components/tableorderCompoments/tableOrder/table_order";
import axios from "axios";
import moment from "moment";
import OrederGraphs from "../../components/tableorderCompoments/OrderGrahps/OrderGrahps";

const OrderList = () => {
  const [order, setOrder] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const getOrderData = async () => {
      try {
        const API = await axios.get("http://127.0.0.1:8000/api/get-order-data");
        console.log(API.data);
        setOrder(API.data.order);
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

  useEffect(() => {
    // creating the table rows.
    const createRows = (data) => {
      return data.map((item) => ({
        id: item.id,
        orderID: item.orderID,
        paymentType: item.paymentType,
        userAddres: item.userAddress,
        totalAmmount: `₱ ${item.totalAmmount}.00`,
        quantity: item.quantity,
        isPaid: item.isPaid === 1 ? "Paid" : "Not Paid",
        isDelivered: item.isDelivered === 1 ? "Delivered" : "Delivering",
        isCancelled: item.isCancelled === 1 ? "Cancelled" : "NotCancelled",
        created_at: formattedDate(item.created_at),
        updated_at: formattedDate(item.updated_at),
      }));
    };
    if (order) {
      const newRows = createRows(order);
      setRows((prevRows) => {
        const rowsMap = new Map(prevRows.map((row) => [row.id, row]));
        newRows.forEach((newRow) => {
          rowsMap.set(newRow.id, newRow);
        });
        return Array.from(rowsMap.values());
      });
    }
  }, [order, rows]);

  return (
    <div className="orderList">
      <SideBar />
      <div className="orderContainer">
        <div className="order-data-wrapper">
          <div className="top">
            <OrederGraphs data={order} />
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
