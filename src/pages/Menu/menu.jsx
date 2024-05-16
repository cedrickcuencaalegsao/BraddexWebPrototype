import "./menu.scss";
import ClientNavBar from "../../components/client/navBar/client_navBar";
import ClientSideBar from "../../components/client/sideBar/client_sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import PermPhoneMsgOutlinedIcon from "@mui/icons-material/PermPhoneMsgOutlined";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import LinearProgress from "@mui/material/LinearProgress";

import ClientWidgets from "../../components/client/page_title_widgets/client_widgets";

const ClientMenu = () => {
  const [data, setData] = useState([]);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const id = localStorage.getItem("id");

  useEffect(() => {
    const MenuAPI = async () => {
      try {
        const API = await axios.get("http://127.0.0.1:8000/api/menu");
        setData(API.data.data);
        setLoading(false);
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

  const addToCartAPI = async (data) => {
    try {
      const API = await axios.post("http://127.0.0.1:8000/api/addtocart", data);
      setResponse(API.data.message);
      console.log(API.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddToCart = async (menu_id) => {
    const data = {
      menu_id: menu_id,
      user_id: id,
    };
    console.log(data);
    const status = await addToCartAPI(data);
    status && history.push("/client-cart");
  };

  const orderNowAPI = async (data) => {
    console.log(data);
  };

  const handleOrderNow = async (menu_id) => {
    const data = {
      menu_id: menu_id,
      user_id: id,
    };
    const status = await orderNowAPI(data);
    status && history.push("/client-delivery");
  };
  console.log(data);
  return (
    <div className="menu">
      <ClientSideBar />
      <div className="menuContianer">
        <ClientNavBar />
        <div className="top">
          <ClientWidgets type="menu" />
        </div>
        <div className="response">
          <div className="messages">
            <span style={{ fontSize: "15px", color: "green" }}>{response}</span>
          </div>
        </div>
        <div className="bottom">
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
          <div className="menuTable">
            {data.map((item) => (
              <div className="card" key={item.id}>
                <img
                  src={`http://127.0.0.1:8000/images/menu/${item.image}`}
                  alt="image"
                  className="image"
                />
                <div className="menu-details">
                  <span className="menu-name">{item.menu_name}</span>
                  <span className="price">{`₱ ${item.price}`}</span>
                </div>
                <div className="card-buttons">
                  <div
                    className="add-to-cart"
                    onClick={() => handleAddToCart(item.id)}
                  >
                    <AddShoppingCartOutlinedIcon />
                    <span>Add to cart</span>
                  </div>
                  <div
                    className="order-now"
                    onClick={() => handleOrderNow(item.id)}
                  >
                    <PermPhoneMsgOutlinedIcon />
                    <span>Order Now</span>
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
