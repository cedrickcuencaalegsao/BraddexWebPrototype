import "./cart.scss";
import ClientSideBar from "../../components/client/sideBar/client_sidebar";
import ClientNavBar from "../../components/client/navBar/client_navBar";
import { useState, useEffect } from "react";
import axios from "axios";
import LinearProgress from "@mui/material/LinearProgress";
import ClientWidgets from "../../components/client/page_title_widgets/client_widgets";

const Cart = () => {
  const [data, setData] = useState([]);
  const [menu, setMenu] = useState([]);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(true);
  // converting object into array so we can use .map() when we return data.
  const menuArray = Object.values(menu);
  const uuid = localStorage.getItem("uuid");

  useEffect(() => {
    const getCartAPI = async () => {
      try {
        const API = await axios.get(`http://127.0.0.1:8000/api/getcart/${uuid}`);
        console.log(API.data.data);

        setData(API.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchData = async () => {
      await getCartAPI();
    };
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const getCartMenuAPI = async (menuIDArray) => {
      try {
        const API = await axios.post(
          "http://127.0.0.1:8000/api/getcartmenu/",
          menuIDArray
        );
        setMenu(API.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    if (data.length > 0) {
      const menuIDArray = data.map((item) => item.id);
      getCartMenuAPI(menuIDArray);
    }
  }, [data]);

  return (
    <div className="cart">
      <ClientSideBar />
      <div className="cartContainer">
        <ClientNavBar />
        <div className="top">
          <ClientWidgets type="cart" />
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
          <div className="table-carts">
            {menuArray.map((item) => (
              <div className="cart-cards" key={item.id}>
                <img
                  src={`http://127.0.0.1:8000/images/menu/${item.image}`}
                  alt="image"
                  className="image"
                />
                <span>{item.menu_name}</span>
                <span>{`₱ ${item.price}`}</span>
                <div className="remove-from-cart">
                  <span>Remove from cart</span>
                </div>
                <div className="order-now">
                  <span>Order Now</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart;
