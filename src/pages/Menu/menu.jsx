import "./menu.scss";
import ClientNavBar from "../../components/client/navBar/client_navBar";
import ClientSideBar from "../../components/client/sideBar/client_sidebar";
import { useState, useEffect } from "react";
import axios from "axios";

const ClientMenu = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const MenuAPI = async () => {
      try {
        const API = await axios.get("http://127.0.0.1:8000/api/menu");
        setData(API.data.data);
        console.log(API.data.data);
      } catch (error) {
        alert(error);
      }
    };
    MenuAPI();
    const interval = setInterval(() => {
      MenuAPI();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="menu">
      <ClientSideBar />
      <div className="menuContianer">
        <ClientNavBar />
        <div className="top">
          <h1 className="title">Menu</h1>
        </div>
        <div className="bottom">
          <div className="menuTable">
            {data.map((item) => (
              //<p key={item.id}>{item.id}</p>
              <div className="card" key={item.id}>
                <img src={`http://127.0.0.1:8000/images/menu/${item.image}`} alt="image" className="image"/>
                <p>{item.menu_name}</p>
                <p>{item.price}</p>
                <div className="card-buttons">
                  <div className="add-to-cart">
                    <p>Add to cart</p>
                  </div>
                  <div className="order-now">
                    <p>Order Now</p>
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

export default ClientMenu;
