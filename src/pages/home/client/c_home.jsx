import "./c_home.scss";
import ClientNavbar from "../../../components/client/navBar/client_navBar";
import ClientSideBar from "../../../components/client/sideBar/client_sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import LinearProgress from "@mui/material/LinearProgress";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";

import ClientWidgets from "../../../components/client/page_title_widgets/client_widgets";

const ClientHome = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [titleImage, setTitleImage] = useState([]);
  const [progTitle, setProgTitle] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    const bestSelling = async () => {
      try {
        const API = await axios.get("http://127.0.0.1:8000/api/bestselling");
        setData(API.data.data);
        setLoading(false);
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

  useEffect(() => {
    const getTitleImageAPI = async () => {
      try {
        const API = await axios.get("http://127.0.0.1:8000/api/titleimages");
        console.log(API.data);
        setTitleImage(API.data);
        setProgTitle(false);
      } catch (error) {
        console.log(error);
      }
    };
    getTitleImageAPI();
    const interval = setInterval(() => {
      getTitleImageAPI();
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
            <ClientWidgets type="home" />
          </div>
          <div className="bottom">
            <h1 className="containerTitle">Best Selling</h1>
            <div className="response">
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
            </div>
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
