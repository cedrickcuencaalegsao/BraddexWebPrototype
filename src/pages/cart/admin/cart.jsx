import "./cart.scss";
import SideBar from "../../../components/sideBar/side_bar";
import NavBar from "../../../components/navBar/nav_bar";
import { useEffect, useState } from "react";
import axios from "axios";
import CartTable from "../../../components/cart_table/cart/cartTable";
import DeletedCart from "../../../components/cart_table/deletedCart/deletedCart";
import NotDeletedCart from "../../../components/cart_table/notDeletedCart/notDeletedCart";
import moment from "moment";

const AdminCart = () => {
  const [cart, setCart] = useState([]);
  const [rows, setRows] = useState([]);
  const [countCart, setCountCart] = useState(0);
  const [cartDeleted, setCartDeleted] = useState(0);
  const [cartNotDeleted, setCartNotDeleted] = useState(0);
  const [cartDeletedPercentage, setCartDeletedPercentage] = useState(0);
  const [cartNotDeletedPercentege, setCartNotDeletedPercentage] = useState(0);

  const calcCartDeleted = (countCart, cartDeleted) => {
    let def_val = 0;
    if (countCart !== null && cartDeleted !== null) {
      let calcResult = (cartDeleted / countCart) * 100;
      return calcResult.toFixed(2);
    } else {
      return def_val.toFixed(2);
    }
  };
  const calcCartNotDeleted = (countCart, cartNotDeleted) => {
    let def_val = 0;
    if (countCart !== null && cartNotDeleted !== null) {
      let calcResult = (cartNotDeleted / countCart) * 100;
      return calcResult.toFixed(2);
    } else {
      return def_val.toFixed(2);
    }
  };

  const formattedDate = (data) => {
    if (data !== null) {
      return moment(data).format("YYYY-MM-DD");
    } else {
      return "No Date.";
    }
  };

  const createRows = (cart) => {
    cart.map((item) => {
      let data = {
        id: item.id,
        cartID: item.cartID,
        userID: item.userID,
        menuID: item.menuID,
        isDeleted: item.isDeleted === 1 ? "Deleted" : "Not Deleted",
        created_at: formattedDate(item.created_at),
        updated_at: formattedDate(item.updated_at),
      };
      
      // check if data is already in the array if true then we update it base on the id as and index.
      const arrayIndex = rows.findIndex((rows) => rows.id === data.id);

      if (arrayIndex !== -1) {
        // here we update the row if the row was update over time.
        setRows((prevRows) => {
          const updatedRow = [...prevRows];
          updatedRow[arrayIndex] = data;
          return updatedRow;
        });
      } else {
        // if data is not on the row then we add it on our row array.
        setRows((prevData) => [...prevData, data]);
      }
    });
  };
  useEffect(() => {
    const getCartAPI = async () => {
      try {
        const API = await axios.get("http://127.0.0.1:8000/api/cart");
        setCart(API.data.cart);
        setCountCart(API.data.cartCount);
        setCartDeleted(API.data.cartDeleted);
        setCartNotDeleted(API.data.cartNotDeleted);
      } catch (error) {
        console.log(error);
      }
    };
    getCartAPI();
    const interval = setInterval(() => {
      getCartAPI();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (cart.length !== 0) {
      createRows(cart);
      const calc_cart_deleted = calcCartDeleted(countCart, cartDeleted);
      setCartDeletedPercentage(calc_cart_deleted);
      const calc_cart_not_deleted = calcCartNotDeleted(
        countCart,
        cartNotDeleted
      );
      setCartNotDeletedPercentage(calc_cart_not_deleted);
    }
  }, [cart, countCart, cartDeleted, cartNotDeleted]);

  return (
    <div className="admin-cart-container">
      <SideBar />
      <div className="cart-table-container">
        <NavBar />
        <div className="top">
          <div className="left">
            <NotDeletedCart data={cartNotDeletedPercentege} />
          </div>
          <div className="right">
            <DeletedCart data={cartDeletedPercentage} />
          </div>
        </div>
        <div className="buttom">
          <CartTable data={rows} />
        </div>
      </div>
    </div>
  );
};
export default AdminCart;
