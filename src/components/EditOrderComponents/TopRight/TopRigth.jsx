import "./TopRight.scss";
import { useEffect, useState } from "react";
import moment from "moment";
import Switch from "@mui/material/Switch";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const EditOrderTopRight = (data) => {
  const order_data = data.data;
  const [orderData, setOrderData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (order_data) {
      setOrderData(order_data);
    }
  }, [order_data]);

  const formatDate = (date) => {
    if (date) {
      return moment(date).format("YYYY-MM-DD");
    }
    return "No Date";
  };

  const onSwitch = (e) => {
    let key = e.target.name;

    const value = (args) => {
      if (args === 0) {
        return 1;
      }
      return 0;
    };

    const updateOrderData = orderData.map((item) => ({
      ...item,
      [key]: value(item[key]),
    }));
    setOrderData(updateOrderData);
  };

  const handleSaveData = async () => {
    try {
      for (const order of orderData) {
        const API = await axios.post(
          "http://127.0.0.1:8000/api/update-order-image",
          order
        );
        const status = API.data;
        status && history.push("/orders");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="edit-order-top-right">
      <div className="top">
        <div className="title-wrapper">
          <span className="title">Edit Order Data</span>
        </div>
        <div className="btn-save-wrapper">
          <SaveOutlinedIcon className="icon" onClick={() => handleSaveData()} />
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
              <Switch
                className="switch"
                name="isCancelled"
                checked={item.isCancelled === 1}
                onChange={onSwitch}
              />
            </div>
            <div className="items">
              <span className="indicator">Mark as Delivered</span>
              <Switch
                className="switch"
                name="isDelivered"
                checked={item.isDelivered === 1}
                onChange={onSwitch}
              />
            </div>
            <div className="items">
              <span className="indicator">Mark as Deleted</span>
              <Switch
                className="switch"
                name="isDeleted"
                checked={item.isDeleted === 1}
                onChange={onSwitch}
              />
            </div>
            <div className="items">
              <span className="indicator">Mark as Paid</span>
              <Switch
                className="switch"
                name="isPaid"
                checked={item.isPaid === 1}
                onChange={onSwitch}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EditOrderTopRight;
