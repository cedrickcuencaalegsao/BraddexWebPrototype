import React from "react";
import "./c_home.scss";
import ClientNavbar from "../../../components/client/navBar/client_navBar";
import ClientSideBar from "../../../components/client/sideBar/client_sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import LinearProgress from "@mui/material/LinearProgress";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import ClientWidgets from "../../../components/client/page_title_widgets/client_widgets";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { generateRandomID } from "../../../idgenerator";

const ClientHome = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const cartID = generateRandomID();
  const userID = localStorage.getItem("uuid");

  useEffect(() => {
    const bestSelling = async () => {
      try {
        const API = await axios.get("http://127.0.0.1:8000/api/bestselling");
        setData(API.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    bestSelling();
    const interval = setInterval(() => {
      bestSelling();
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const handleOderNow = (menuID) => {
    let menu_ID = menuID;
    history.push(`/client-order-now/${menu_ID}`);
  };
  const handleAddToCart = async (menuID) => {
    let data = {
      cartID: cartID,
      userID: userID,
      menuID: menuID,
    };
    await addToCartAPI(data);
  };
  const addToCartAPI = async (data) => {
    console.log(data);
    try {
      await axios.post("http://127.0.0.1:8000/api/addtocart", data);
      history.push("/client-cart");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="clientHome">
      <ClientSideBar />
      <div className="clientHomeContianer">
        <ClientNavbar />
        <div className="content">
          <div className="top">
            <ClientWidgets type="home" />
          </div>
          <div className="bottom">
            <h1 className="containerTitle">Best Selling</h1>
            <div className="response">
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
            </div>
            <div className="bottomContainer">
              {data.map((item) => (
                <div className="cards" key={item.id}>
                  <div className="card-top-container">
                    <div className="item-detail-container">
                      <div className="menu-name-container">
                        <h3 className="menu-name">{item.menu_name}</h3>
                      </div>
                      <div className="menu-name-indicator-container">
                        <span className="menu-name-indicator">Menu Name</span>
                      </div>
                    </div>
                    <div
                      className="add-to-cart-container"
                      onClick={() => handleAddToCart(item.menuID)}
                    >
                      <AddShoppingCartOutlinedIcon className="icon-add-to-cart" />
                    </div>
                  </div>
                  <div className="cards-center-container">
                    <img
                      src={`http://127.0.0.1:8000/images/menu/${item.image}`}
                      alt={item.menu_name}
                      className="image"
                    />
                  </div>
                  <div className="card-bottom-container">
                    <div className="menu-price-wrapper">
                      <div className="menu-price-indicator-container">
                        <span className="menu-price-indicator">Menu Price</span>
                      </div>
                      <div className="menu-price-container">
                        <h3 className="meni-price">{`₱ ${item.price}.00`}</h3>
                      </div>
                    </div>
                    <div
                      className="btn-order-container"
                      onClick={() => handleOderNow(item.menuID)}
                    >
                      <button className="btn-order-now">Order Now</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ClientHome;
