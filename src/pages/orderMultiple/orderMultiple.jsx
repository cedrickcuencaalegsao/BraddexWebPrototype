import React from "react";
import "./orderMultiple.scss";
import ClientSideBar from "../../components/client/sideBar/client_sidebar";
import ClientNavBar from "../../components/client/navBar/client_navBar";
import {
  useParams,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";
import axios from "axios";
import { generateRandomID } from "../../idgenerator";
import LinearProgress from "@mui/material/LinearProgress";

const ClientOrderMultiple = () => {
  const selectedItems = useParams();
  const [menu, setMenu] = useState([]);
  const [dataToSend, setDataToSend] = useState([]);
  const [paymentType, setPaymentType] = useState("");
  const [address, setAddress] = useState("");
  const [orderCount, setOrderCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const uuID = localStorage.getItem("uuid");
  const orderID = generateRandomID();

  let data = selectedItems.data;
  const dataArray = data.split(",");
  console.log(dataArray);
  const multiOrderAPI = async (data) => {
    try {
      const resp = await axios.post(
        "http://127.0.0.1:8000/api/multi-order/",
        data
      );
      console.log(resp.data);
      return true;
    } catch (error) {
      return false;
    }
  };
  useEffect(() => {
    const getMultipleOrderApi = async () => {
      console.log("ok");
      try {
        const API = await axios.post(
          "http://127.0.0.1:8000/api/get-multiple-order/",
          dataArray
        );
        setMenu(API.data.menu);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getMultipleOrderApi();
  }, [dataArray]);
  useEffect(() => {
    let count_order = dataToSend.filter((item) => item.Quantity !== 0).length;
    let totalAmount = dataToSend.reduce(
      (accumulator, item) => accumulator + item.totalPrice,
      0
    );
    setTotalAmount(totalAmount);
    setOrderCount(count_order);
  }, [dataToSend]);

  const handlePlaceOrderAPI = async () => {
    const data = dataToSend.filter((item) => item.Quantity !== 0);
    const status = await multiOrderAPI(data);
    status && history.push("/client-delivery");
  };
  const handleQuantity = (menuID, action, price, menuName) => {
    // check if menu was in our array to be sent to the server.
    const menuIndex = dataToSend.findIndex((item) => item.menuID === menuID);
    // if menu exists, update its quantity, else add new menu as an objects.

    // update the quantity added by 1.
    const newDataToSend = [...dataToSend];

    // calculate the item price multiply buy the number of quantity to get the total price.
    const newPrice = (price) => {
      let newPrice = price * newDataToSend[menuIndex].Quantity;
      return newPrice;
    };

    if (menuIndex !== -1) {
      if (action === "increment") {
        newDataToSend[menuIndex].Quantity += 1;
        let totalPrice = newPrice(price);
        newDataToSend[menuIndex].totalPrice = totalPrice;
      } else if (action === "decrement") {
        if (newDataToSend[menuIndex].Quantity !== 0) {
          newDataToSend[menuIndex].Quantity -= 1;
          let totalPrice = newPrice(price);
          newDataToSend[menuIndex].totalPrice = totalPrice;
        }
      }
      setDataToSend(newDataToSend);
    } else {
      // if menu not exists.
      if (action === "increment") {
        if (paymentType !== "" && address !== "") {
          setDataToSend((prevDataToSend) => [
            ...prevDataToSend,
            {
              orderID: orderID,
              menuID: menuID,
              menuName: menuName,
              uuID: uuID,
              Quantity: 1,
              totalPrice: price,
              paymentType: paymentType,
              address: address,
            },
          ]);
        } else {
          alert(
            "Please fill up the payment type and delivery address first before adding items. If payment type and address is unintentionally made you can repeat the process by simply reloading the page."
          );
        }
      } else {
        return 0;
      }
    }
  };
  const displayQuantity = (menuID) => {
    let menuArray = dataToSend.findIndex((item) => item.menuID === menuID);
    if (menuArray !== -1) {
      return dataToSend[menuArray].Quantity;
    } else {
      return 0;
    }
  };

  return (
    <div className="order-multiple">
      <ClientSideBar />
      <div className="order-multiple-container">
        <ClientNavBar />
        <div className="order-data-main-contaner">
          <div className="right-container">
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
            <div className="upper-container">
              <div className="upper-title-wrapper">
                <h3 className="upper-title">Order Receipt</h3>
              </div>
              <div className="total-ammount-receipt">
                <span className="total-indicator">Total</span>
                <h3 className="total-value">{`₱ ${totalAmount}.00`}</h3>
              </div>
              <div className="btn-place-order-wrapper">
                <button
                  className="btn-place-order"
                  onClick={() => handlePlaceOrderAPI()}
                >
                  Place Order ({orderCount})
                </button>
              </div>
            </div>
            <div className="center-container">
              <div className="payment-type-wrapper">
                <span className="payment-type-indicator">Payment Type</span>
                <select
                  name="paymentType"
                  id="paymentType"
                  className="payment-type"
                  onChange={(e) => setPaymentType(e.target.value)}
                  disabled={dataToSend.length > 0}
                >
                  <option value="Select">Select</option>
                  <option value="Cash on delivery">Cash on delivery</option>
                  <option value="Pay On Casher Area">Pay On Casher Area</option>
                </select>
              </div>
              <div className="address-wrapper">
                <span className="address-indicator">Delivery Address</span>
                <input
                  type="text"
                  className="address"
                  onChange={(e) => setAddress(e.target.value)}
                  disabled={dataToSend.length > 0}
                />
              </div>
            </div>
            <div className="lower-container">
              {dataToSend.map((item) =>
                item.Quantity !== 0 ? (
                  <div className="menu-receipt-container" key={item.menuID}>
                    <div className="left-menu-receipt-wrapper">
                      <span className="menu-receipt-indicator">Menu Name</span>
                      <span className="menu-receipt-indicator">Quantity</span>
                      <span className="menu-receipt-indicator">
                        Total Price
                      </span>
                    </div>
                    <div className="right-menu-receipt-wrapper">
                      <span className="menu-receipt-value">
                        {item.menuName}
                      </span>
                      <span className="menu-receipt-value">
                        {item.Quantity}
                      </span>
                      <span className="menu-receipt-value">
                        {`₱ ${item.totalPrice}.00`}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div key={item.id}></div>
                )
              )}
            </div>
          </div>
          <div className="left-container">
            {menu.map((item) => (
              <div className="menu-continer" key={item.menuID}>
                <div className="menu-title-container">
                  <div className="title-menu-container">
                    <h3 className="menu-title">Menu</h3>
                  </div>
                  <div className="quantity-container">
                    <div className="add-wrapper">
                      <button
                        className="btn-add"
                        onClick={() =>
                          handleQuantity(
                            item.menuID,
                            "increment",
                            item.price,
                            item.menu_name
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                    <div className="qantity-wrapper">
                      <span className="quantity">
                        {displayQuantity(item.menuID)}
                      </span>
                    </div>
                    <div className="diff-wrapper">
                      <button
                        className="btn-diff"
                        onClick={() =>
                          handleQuantity(
                            item.menuID,
                            "decrement",
                            item.price,
                            item.menu_name
                          )
                        }
                      >
                        -
                      </button>
                    </div>
                  </div>
                </div>
                <div className="center-menu-container">
                  <div className="image-wrapper">
                    <img
                      src={`http://127.0.0.1:8000/images/menu/${item.image}`}
                      alt="menuPicture"
                      className="image"
                    />
                  </div>
                </div>
                <div className="bottom-menu-container">
                  <div className="menu-name-container">
                    <div className="menu-name-wrapper">
                      <h3 className="menu-name">{item.menu_name}</h3>
                    </div>
                    <div className="menu-name-indicator-wrapper">
                      <span className="menu-name-indicator">Menu Name</span>
                    </div>
                  </div>
                  <div className="menu-price-container">
                    <div className="menu-price-wrapper">
                      <h3 className="menu-price">{`₱ ${item.price}.00`}</h3>
                    </div>
                    <div className="menu-price-indicator-wrapper">
                      <span className="menu-price-indicator">Menu Price</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientOrderMultiple;
