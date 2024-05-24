import "./orderMultiple.scss";
import ClientSideBar from "../../components/client/sideBar/client_sidebar";
import ClientNavBar from "../../components/client/navBar/client_navBar";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import axios from "axios";

const ClientOrderMultiple = () => {
  const selectedItems = useParams();
  const [menu, setMenu] = useState([]);
  const [dataToSend, setDataToSend] = useState([]);
  let data = selectedItems.data;
  const dataArray = data.split(",");
  const uuID = localStorage.getItem("uuid");

  const getMultipleOrderApi = async () => {
    try {
      const API = await axios.post(
        "http://127.0.0.1:8000/api/get-multiple-order/",
        dataArray
      );
      setMenu(API.data.menu);
    } catch (error) {
      console.log(error);
    }
  };
  const handleQuantity = (menuID, action) => {
    // check if menu was in our array to be sent to the server.
    const menuIndex = dataToSend.findIndex((item) => item.menuID == menuID);
    // if menu exists, update its quantity, else add new menu as an objects.
    if (menuIndex !== -1) {
      // update the quantity added by 1.
      const newDataToSend = [...dataToSend];
      if (action == "increment") {
        newDataToSend[menuIndex].Quantity += 1;
      } else {
        if (newDataToSend[menuIndex].Quantity == 0) {
          return 0;
        } else {
          newDataToSend[menuIndex].Quantity -= 1;
        }
      }
      setDataToSend(newDataToSend);
    } else {
      // if menu !exists.
      setDataToSend((prevDataToSend) => [
        ...prevDataToSend,
        { menuID: menuID, uuID: uuID, Quantity: 1 },
      ]);
    }
  };
  console.log(dataToSend);
  return (
    <div className="order-multiple" onLoad={() => getMultipleOrderApi()}>
      <ClientSideBar />
      <div className="order-multiple-container">
        <ClientNavBar />
        <div className="order-data-main-contaner">
          <div className="top">
            <div className="upper-container">
              <div className="upper-title-wrapper">
                <h3 className="upper-title">Order Receipt</h3>
              </div>
              <div className="btn-place-order-wrapper">
                <button className="btn-place-order">Place Order</button>
              </div>
            </div>
          </div>
          <div className="bottom">
            {menu.map((item) => (
              <div className="menu-continer" key={item.menuID}>
                <div className="menu-title-container">
                  <div className="title-menu-container">
                    <h3 className="menu-title">Menu</h3>
                  </div>
                  <div className="quantity-container">
                    <div
                      className="add-wrapper"
                      onClick={() => handleQuantity(item.menuID, "increment")}
                    >
                      <button className="btn-add">+</button>
                    </div>
                    <div className="qantity-wrapper">
                      <span className="quantity">0</span>
                    </div>
                    <div
                      className="diff-wrapper"
                      onClick={() => handleQuantity(item.menuID, "decrement")}
                    >
                      <button className="btn-diff">-</button>
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
