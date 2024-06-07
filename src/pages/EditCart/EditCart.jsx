import "./EditCart.scss";
import SideBar from "../../components/sideBar/side_bar";
import NavBar from "../../components/navBar/nav_bar";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";
import axios from "axios";
import EditCartLeftTop from "../../components/EditCartComponents/CartLeftTop/CartLeftTop";
import EditCartLeftBottom from "../../components/EditCartComponents/CartLeftBottom/CartLeftBottom";

const EditCart = () => {
  const data = useParams();
  const [cartData, setCartData] = useState([]);
  const [menuData, setMenuData] = useState([]);
  const [countInCart, setCountInCart] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  // here we get the cart that was pass to this component.
  useEffect(() => {
    let cartID = data.cartID;
    const getCartData = async () => {
      try {
        const API = await axios.get(
          `http://127.0.0.1:8000/api/get-cart-data/${cartID}`
        );
        console.log(API.data);
        setCartData(API.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCartData();
  }, [data]);

  // here we should get the menu id
  useEffect(() => {
    let menu_id; // make a variable for our menu id.
    cartData.map((item) => (menu_id = item.menuID)); // use .map to get the menu id.
    const getMenuData = async (data) => {
      try {
        const API = await axios.get(
          `http://127.0.0.1:8000/api/get-cart-data-menu/${data}`
        );
        setCartCount(API.data.cartCount);
        setCountInCart(API.data.countInCart);
        setMenuData(API.data.menu);
      } catch (error) {
        console.log(error);
      }
    };
    if (menu_id !== null) {
      getMenuData(menu_id);
    }
  }, [data, cartData]);

  // create data for the left top widgets.
  const LeftTopData = () => {
    let data;
    if (menuData.length !== 0) {
      menuData.map(
        (item) =>
          (data = {
            menuID: item.menuID,
            menuName: item.menu_name,
            image: item.image,
            price: item.price,
          })
      );
      return data;
    }
    return {
      menuID: "Loading...",
      menuName: "Loading...",
      image: "Loading...",
      price: "Loading...",
    };
  };

  const LeftBottomData = () => {
    let data;
    if (menuData.length !== 0) {
      menuData.map((item) => (data = { menuID: item.menuID }));
      return data;
    }
  };

  let leftTopData = LeftTopData();
  let leftBottomData = LeftBottomData();
  console.log(cartData, menuData, countInCart, cartCount);
  return (
    <div className="edit-cart">
      <SideBar />
      <div className="container">
        <NavBar />
        <div className="content-wrapper">
          <div className="left">
            <EditCartLeftTop data={leftTopData} />
            <EditCartLeftBottom data={leftBottomData} />
          </div>
          <div className="right">
            <div className="title-wrapper">
              <h1 className="title">Right</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditCart;
