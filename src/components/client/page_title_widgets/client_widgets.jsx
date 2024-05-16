import axios from "axios";
import "./client_wdgets.scss";
import { useState, useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";

const ClientWidgets = ({ type }) => {
  let pageTitle;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  switch (type) {
    case "home":
      pageTitle = "Home";
      break;
    case "menu":
      pageTitle = "Menu";
      break;
    case "cart":
      pageTitle = "Cart";
      break;
    case "delivery":
      pageTitle = "Delivery";
      break;
  }

  const handelCollpase = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const API = await axios.get("http://127.0.0.1:8000/api/titleimages");
        console.log(API.data);
        setData(API.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
    const interval = setInterval(() => {
      getData();
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="widget-container">
      <div className="top-container">
        <div className="title-container">
          <h1 className="title">{pageTitle}</h1>
        </div>
        <div className="toggleButton" onClick={handelCollpase}>
          {collapsed ? <ExpandMoreOutlinedIcon /> : <ExpandLessOutlinedIcon />}
        </div>
      </div>
      {loading ? (
        <LinearProgress
          sx={{
            bgcolor: "lightgray",
            "& .MuiLinearProgress-bar": { bgcolor: "orangered" },
          }}
        />
      ) : (
        <div
          className={`widgets-image-container-${
            collapsed ? "collapsed" : "not-colapsed"
          }`}
        >
          <div className="image-wrapper">
            {data.map((item) => (
              <img
                src={`http://127.0.0.1:8000/images/menu/${item}`}
                alt="image"
                className="image"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientWidgets;
