import "./TopRight.scss";
import { useEffect, useState } from "react";
import moment from "moment";
import Switch from "@mui/material/Switch";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

const EditOrderTopRight = (data) => {
  const order_data = data.data;
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    if (order_data) {
      setOrderData(order_data);
    }
  }, [order_data]);

  const formatDate = (date) => {
    if (date) {
      console.log(date);
      return moment(date).format("YYYY-MM-DD");
    }
    return "No Date";
  };

  console.log(orderData);

  return (
    <div className="edit-order-top-right">
      <div className="top">
        <div className="title-wrapper">
          <span className="title">Edit Order Data</span>
        </div>
        <div className="btn-save-wrapper">
          <SaveOutlinedIcon className="icon"/>
        </div>
      </div>
      {orderData.map((item) => (
        <div className="edit-order-data-container" key={item.id}>
          <div className="left">
            <div className="items">
              <span className="indicator">Menu ID</span>
              <span className="value">{item.menuID}</span>
            </div>
            <div className="items">
              <span className="indicator">Order ID</span>
              <span className="value">{item.orderID}</span>
            </div>
            <div className="items">
              <span className="indicator">Quantity</span>
              <span className="value">{item.quantity}</span>
            </div>
            <div className="items">
              <span className="indicator">Total Amount</span>
              <span className="value">{item.totalAmmount}</span>
            </div>
            <div className="items">
              <span className="indicator">Payment Type</span>
              <span className="value">{item.paymentType}</span>
            </div>
            <div className="items">
              <span className="indicator">Delivery Address</span>
              <span className="value">{item.userAddress}</span>
            </div>
          </div>
          <div className="right">
            <div className="items">
              <span className="indicator">Date Ordered</span>
              <span className="value">{formatDate(item.created_at)}</span>
            </div>
            <div className="items">
              <span className="indicator">Order Update</span>
              <span className="value">{formatDate(item.updated_at)}</span>
            </div>
            <div className="items">
              <span className="indicator">Mark as Cancelled</span>
              <Switch className="switch" checked={item.isCancelled === 1} />
            </div>
            <div className="items">
              <span className="indicator">Mark as Delivered</span>
              <Switch className="switch" checked={item.isDelivered === 1} />
            </div>
            <div className="items">
              <span className="indicator">Mark as Deleted</span>
              <Switch className="switch" checked={item.isDeleted === 1} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EditOrderTopRight;
