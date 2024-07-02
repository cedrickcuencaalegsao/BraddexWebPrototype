import "./product.scss";
import SideBar from "../../components/sideBar/side_bar";
import TableProducts from "../../components/products/table_products";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductAvailable from "../../components/productComponents/productAvailable/productAvailable";
import ProductLimited from "../../components/productComponents/productLimited/productLimited";
import ProductNotAvailable from "../../components/productComponents/productNotAvailable/productNotAvailable";

const List = () => {
  const [data, setData] = useState([]);
  const [countMenu, setCountMenu] = useState(0);
  const [available, setAvailable] = useState(0);
  const [limited, setLimited] = useState(0);
  const [notAvailable, setNotAvailable] = useState(0);

  let prod_available = { count: countMenu, available: available };
  let prod_limited = { count: countMenu, limited: limited };
  let prod_not_available = { count: countMenu, notAvailable: notAvailable };

  useEffect(() => {
    const MenuAPI = async () => {
      try {
        const API = await axios.get("http://127.0.0.1:8000/api/get-menu-data");
        setData(API.data.menu);
        setCountMenu(API.data.countMenu);
        setAvailable(API.data.avialable);
        setLimited(API.data.limited);
        setNotAvailable(API.data.notAvailable);
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

  return (
    <div className="list">
      <SideBar />
      <div className="listContainer">
        <div className="top">
          <ProductAvailable data={prod_available} />
          <ProductLimited data={prod_limited} />
          <ProductNotAvailable data={prod_not_available} />
        </div>
        <div className="table">
          <TableProducts data={data} />
        </div>
      </div>
    </div>
  );
};

export default List;
