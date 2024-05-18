import "./menu.scss";
import ClientNavBar from "../../components/client/navBar/client_navBar";
import ClientSideBar from "../../components/client/sideBar/client_sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import LinearProgress from "@mui/material/LinearProgress";
import { generateRandomID } from "../../idgenerator";
import ClientWidgets from "../../components/client/page_title_widgets/client_widgets";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";

const ClientMenu = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const userID = localStorage.getItem("uuid");
  const cartID = generateRandomID();

  let itemsAddToCart = [];
  let selectedMenuList = [];

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

  const addToCartAPI = async (data) => {
    try {
      const API = await axios.post("http://127.0.0.1:8000/api/addtocart", data);
      history.push("/client-cart");
    } catch (error) {
      console.log(error);
    }
  };

  const selectedMenu = (id) => {
    console.log(id);
  };

  const handleAddToCart = async (menuID) => {
    const data = {
      cartID: cartID,
      menuID: menuID,
      userID: userID,
    };
    itemsAddToCart.push(data);
    console.log(itemsAddToCart);
    // const status = await addToCartAPI(data);
    // status && history.push("/client-cart");
  };

  const orderNowAPI = async (data) => {
    console.log(data);
  };

  const handleOrderNow = async (menuID) => {
    const data = {
      cartID: cartID,
      menuID: menuID,
      userID: userID,
    };
    console.log(data);
    const status = await orderNowAPI(data);
    status && history.push("/client-delivery");
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
              <div
                className="card"
                key={item.id}
                onClick={() => selectedMenu(item.menuID)}
              >
                <img
                  src={`http://127.0.0.1:8000/images/menu/${item.image}`}
                  alt="image"
                  className="image"
                />
                <div className="menu-details">
                  <span className="menu-name">{item.menu_name}</span>
                  <span className="price">{`₱ ${item.price}`}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Box sx={{ "& > :not(style)": { m: 1 } }} className="floating-box">
          <Fab
            aria-label="addtocart"
            sx={{
              bgcolor: "orange",
              "&:hover": { bgcolor: "orangered", scale: "1.2" },
            }}
            onClick={() => handleAddToCart()}
          >
            <AddShoppingCartOutlinedIcon
              sx={{
                color: "white",
              }}
            />
          </Fab>
          <Fab
            aria-label="ordernow"
            sx={{
              bgcolor: "orange",
              "&:hover": { bgcolor: "orangered", scale: "1.2" },
            }}
          >
            <DeliveryDiningIcon
              sx={{
                color: "white",
              }}
            />
          </Fab>
        </Box>
      </div>
    </div>
  );
};

export default ClientMenu;
