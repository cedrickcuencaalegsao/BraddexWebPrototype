import "./cart.scss";
import ClientSideBar from "../../components/client/sideBar/client_sidebar";
import ClientNavBar from "../../components/client/navBar/client_navBar";
import { useState, useEffect } from "react";
import axios from "axios";

const Cart = () => {
  const [data, setData] = useState([]);
  const [menu, setMenu] = useState([]);
  // converting object into array so we can use .map() when we return data.
  const menuArray = Object.values(menu);
  const id = localStorage.getItem("id");

  useEffect(() => {
    const getCartAPI = async () => {
      try {
        const API = await axios.get(`http://127.0.0.1:8000/api/getcart/${id}`);
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

    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  const getCartMenuAPI = async (menuIDArray) => {
    console.log(menuIDArray);
    try {
      const API = await axios.post(
        "http://127.0.0.1:8000/api/getcartmenu/",
        menuIDArray
      );
      console.log(API.data.data);
      setMenu(API.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const menuIDArray = data.map((item) => item.id);
  getCartMenuAPI(menuIDArray);
  console.log(menu);

  return (
    <div className="cart">
      <ClientSideBar />
      <div className="cartContainer">
        <ClientNavBar />
        <div className="top">
          <div className="title">
            <h1>Cart</h1>
          </div>
        </div>
        <div className="bottom">
          <div className="table-carts">
            {menuArray.map((item) => (
              <div className="cart-cards" key={item.id}>
                <p>{item.menu_name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart;
