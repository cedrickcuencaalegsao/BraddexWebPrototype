import "./cart.scss";
import SideBar from "../../../components/sideBar/side_bar";
import { useEffect, useState } from "react";
import axios from "axios";
import CartTable from "../../../components/cart_table/cart/cartTable";
import moment from "moment";
import CartChart from "../../../components/CartComponents/CartChart";

const AdminCart = () => {
  const [cart, setCart] = useState([]);
  const [rows, setRows] = useState([]);

  const formattedDate = (data) => {
    if (data !== null) {
      return moment(data).format("YYYY-MM-DD");
    } else {
      return "No Date.";
    }
  };

  useEffect(() => {
    const getCartAPI = async () => {
      try {
        const API = await axios.get("http://127.0.0.1:8000/api/cart");
        setCart(API.data.cart);
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
    const createRows = (cart) => {
      return cart.map((item) => ({
        id: item.id,
        cartID: item.cartID,
        userID: item.userID,
        menuID: item.menuID,
        isDeleted: item.isDeleted === 1 ? "Deleted" : "Not Deleted",
        created_at: formattedDate(item.created_at),
        updated_at: formattedDate(item.updated_at),
      }));
    };

    if (cart) {
      const newRows = createRows(cart);

      setRows((prevRows) => {
        const rowsMap = new Map(prevRows.map((row) => [row.id, row]));

        newRows.forEach((newRow) => {
          rowsMap.set(newRow.id, newRow);
        });

        return Array.from(rowsMap.values());
      });
    }
  }, [cart]);

  return (
    <div className="admin-cart-container">
      <SideBar />
      <div className="cart-table-container">
        <div className="top">
          <CartChart data={cart} />
        </div>
        <div className="bottom">
          <CartTable data={rows} />
        </div>
      </div>
    </div>
  );
};
export default AdminCart;
