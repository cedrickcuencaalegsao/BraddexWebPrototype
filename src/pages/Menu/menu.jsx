import "./menu.scss";
import ClientNavBar from "../../components/client/navBar/client_navBar";
import ClientSideBar from "../../components/client/sideBar/client_sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import LinearProgress from "@mui/material/LinearProgress";
import { generateRandomID } from "../../idgenerator";
import ClientWidgets from "../../components/client/page_title_widgets/client_widgets";

const ClientMenu = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const userID = localStorage.getItem("uuid");
  const cartID = generateRandomID();

  useEffect(() => {
    const MenuAPI = async () => {
      try {
        const API = await axios.get("http://127.0.0.1:8000/api/menu");
        setData(API.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
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
      await axios.post("http://127.0.0.1:8000/api/addtocart", data);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const handleAddToCart = async (menuID) => {
    let data = {
      cartID: cartID,
      userID: userID,
      menuID: menuID,
    };
    const status = await addToCartAPI(data);
    status && history.push("/client-cart");
  };

  const handleOderNow = (menuID) => {
    let menu_ID = menuID;
    history.push(`/client-order-now/${menu_ID}`);
  };

  return (
    <div className="menu">
      <ClientSideBar />
      <div className="menuContianer">
        <ClientNavBar />
        <div className="top">
          <ClientWidgets type="menu" />
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
                <div className="menu-name-container">
                  <div className="menunamecontainer">
                    <h1 className="menuname">{item.menu_name}</h1>
                    <span className="menu-name-indicator">Menu Name</span>
                  </div>
                  <div
                    className="add-to-cart"
                    onClick={() => handleAddToCart(item.menuID)}
                  >
                    <AddShoppingCartOutlinedIcon className="icon-add-to-cart" />
                  </div>
                </div>
                <div className="image-wrapper">
                  <img
                    src={`http://127.0.0.1:8000/images/menu/${item.image}`}
                    alt="image"
                    className="image"
                  />
                </div>
                <div className="price-order-container">
                  <div className="price-container">
                    <span className="price-indicator">Total Price:</span>
                    <span className="menu-price">{`₱.${item.price}`}</span>
                  </div>
                  <div
                    className="order-button-container"
                    onClick={() => handleOderNow(item.menuID)}
                  >
                    <button className="btn-order-now">Oder Now</button>
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
