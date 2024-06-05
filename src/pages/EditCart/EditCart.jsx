import "./EditCart.scss";
import SideBar from "../../components/sideBar/side_bar";
import NavBar from "../../components/navBar/nav_bar";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";
import axios from "axios";

const EditCart = () => {
  const data = useParams();
  const [cartData, setCartData] = useState([]);
  const [menuID, setMenuID] = useState("");

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
    setMenuID(menu_id); // set menu id to our useState variable.
  }, [data, cartData]);
  
  console.log(cartData, menuID);
  return (
    <div className="edit-cart">
      <SideBar />
      <div className="container">
        <NavBar />
        <div className="content-wrapper">
          <div className="left">
            <div className="top">
              <div className="title-wrapper">
                <h1 className="title">Edit Cart</h1>
              </div>
            </div>
          </div>
          <div className="bottom">bottom</div>
        </div>
      </div>
    </div>
  );
};
export default EditCart;
