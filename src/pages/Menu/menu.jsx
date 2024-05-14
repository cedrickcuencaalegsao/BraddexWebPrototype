import "./menu.scss";
import ClientNavBar from "../../components/client/navBar/client_navBar";
import ClientSideBar from "../../components/client/sideBar/client_sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import PermPhoneMsgOutlinedIcon from "@mui/icons-material/PermPhoneMsgOutlined";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ClientMenu = () => {
  const [data, setData] = useState([]);
  const [response, setResponse] = useState("");
  const history = useHistory();
  const id = localStorage.getItem("id");

  useEffect(() => {
    const MenuAPI = async () => {
      try {
        const API = await axios.get("http://127.0.0.1:8000/api/menu");
        setData(API.data.data);
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
      setResponse(API.data);
      console.log(API.data);
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
          <h1 className="title">Menu</h1>
        </div>
        <div className="bottom">
          <div className="menuTable">
            {data.map((item) => (
              <div className="card" key={item.id}>
                <img
                  src={`http://127.0.0.1:8000/images/menu/${item.image}`}
                  alt="image"
                  className="image"
                />
                <p>{item.menu_name}</p>
                <p>{item.price}</p>
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
