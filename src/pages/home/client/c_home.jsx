import "./c_home.scss";
import ClientNavbar from "../../../components/client/navBar/client_navBar";
import ClientSideBar from "../../../components/client/sideBar/client_sidebar";
import { useState, useEffect } from "react";
import axios from "axios";

const ClientHome = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const bestSelling = async () => {
      try {
        const API = await axios.get("http://127.0.0.1:8000/api/bestselling");
        setData(API.data.data);
        console.log(API.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    bestSelling();
    const interval = setInterval(() => {
      bestSelling();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="clientHome">
      <ClientSideBar />
      <div className="clientHomeContianer">
        <ClientNavbar />
        <div className="content">
          <div className="top">
            <h1 className="pagetitle">Home</h1>
            <img src="#" alt="image" />
          </div>
          <div className="bottom">
            <h1 className="containerTitle">Best Selling</h1>
            <div className="bottomContainer">
              {data.map((item) => (
                <div className="cards" key={item.id}>
                  <img
                    src={`http://127.0.0.1:8000/images/menu/${item.image}`}
                    alt={item.menu_name}
                    className="image"
                  />
                  <p className="itemName">{item.menu_name}</p>
                  <p className="itemPice">{item.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ClientHome;
