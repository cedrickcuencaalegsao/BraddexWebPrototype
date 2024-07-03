import "./product.scss";
import SideBar from "../../components/sideBar/side_bar";
import TableProducts from "../../components/products/table_products";
import { useState, useEffect } from "react";
import axios from "axios";
import MenuGraph from "../../components/productComponents/menuGraph";

const List = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const MenuAPI = async () => {
      try {
        const API = await axios.get("http://127.0.0.1:8000/api/get-menu-data");
        setData(API.data.menu);
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
          <MenuGraph data={data}/>
        </div>
        <div className="table">
          <TableProducts data={data} />
        </div>
      </div>
    </div>
  );
};

export default List;
