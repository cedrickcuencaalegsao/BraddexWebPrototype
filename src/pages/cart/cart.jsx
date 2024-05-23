import "./cart.scss";
import ClientSideBar from "../../components/client/sideBar/client_sidebar";
import ClientNavBar from "../../components/client/navBar/client_navBar";
import { useState, useEffect } from "react";
import axios from "axios";
import LinearProgress from "@mui/material/LinearProgress";
import ClientWidgets from "../../components/client/page_title_widgets/client_widgets";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const Cart = () => {
  const [data, setData] = useState([]);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedAll, setSelectedAll] = useState(false);
  const history = useHistory();
  // converting object into array so we can use .map() when we return data.
  const menuArray = Object.values(menu);
  const uuid = localStorage.getItem("uuid");

  useEffect(() => {
    const getCartAPI = async () => {
      try {
        const API = await axios.get(
          `http://127.0.0.1:8000/api/getcart/${uuid}`
        );
        setData(API.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    const getCartMenuAPI = async (menuIDArray) => {
      try {
        const API = await axios.post(
          "http://127.0.0.1:8000/api/getcartmenu/",
          menuIDArray
        );
        setMenu(API.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    if (data.length > 0) {
      const menuIDArray = data.map((item) => item.menuID);
      console.log(menuIDArray);
      getCartMenuAPI(menuIDArray);
    }
    getCartAPI();
    const interval = setInterval(() => {
      getCartAPI();
    }, 1000);
    return () => clearInterval(interval);
  }, [data]);

  // console.log(data, menuArray);

  const handleOderNow = (menuID) => {
    let menu_ID = menuID;
    history.push(`/client-order-now/${menu_ID}`);
  };

  const handleSelectCardItem = (menuID) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(menuID)
        ? prevSelectedItems.filter((id) => id !== menuID)
        : [...prevSelectedItems, menuID]
    );
  };

  const orderNowAPI = () => {
    let dataToPass = selectedItems;

    history.push(`/client-order-multiple/${dataToPass}`);
  };

  const removeFromMyCartAPI = async () => {
    console.log(selectedItems);
  };

  const addToMyFavorites = async () => {
    console.log(selectedItems);
  };

  const showOption = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSelectAll = () => {
    setSelectedItems(menuArray.map((item) => item.menuID));
    setSelectedAll(true);
  };

  const handleDeselectAll = () => {
    setSelectedItems([]);
    setSelectedAll(false);
  };
  return (
    <div className="cart">
      <ClientSideBar />
      <div className="cartContainer">
        <ClientNavBar />
        <div className="top">
          <ClientWidgets type="cart" />
        </div>
        <div className="bottom">
          <div className="bottom-top-container">
            <div className="bottom-title-container">
              <h1 className="bottom-title">Cart List</h1>
            </div>

            <div className="bottom-icon-continer" onClick={() => showOption()}>
              <MoreVertIcon className="bottom-icon" />
              {showDropdown && (
                <div className="table-option">
                  <span onClick={() => handleSelectAll()}>Select All</span>
                  <span onClick={() => handleDeselectAll()}>Deselect All</span>
                </div>
              )}
            </div>
          </div>
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
          <div className="floating-botton-continer">
            <Box sx={{ "& > :not(style)": { m: 1 } }} className="box-container">
              <Fab
                color="primary"
                onClick={() => orderNowAPI()}
                sx={{
                  backgroundColor: "white",
                  "&:hover": {
                    backgroundColor: "orangered",
                    "& .MuiSvgIcon-root": {
                      color: "white",
                      scale: "1.2",
                    },
                  },
                }}
              >
                <DeliveryDiningIcon
                  sx={{
                    color: "orangered",
                  }}
                />
              </Fab>
              <Fab
                color="secondary"
                aria-label="edit"
                onClick={() => removeFromMyCartAPI()}
                sx={{
                  backgroundColor: "white",
                  "&:hover": {
                    backgroundColor: "red",
                    "& .MuiSvgIcon-root": {
                      color: "white",
                      scale: "1.2",
                    },
                  },
                }}
              >
                <DeleteOutlineRoundedIcon
                  sx={{
                    color: "red",
                  }}
                />
              </Fab>

              <Fab
                aria-label="like"
                onClick={() => addToMyFavorites()}
                sx={{
                  backgroundColor: "white",
                  "&:hover": {
                    backgroundColor: "crimson",
                    "& .MuiSvgIcon-root": {
                      color: "white",
                      scale: "1.2",
                    },
                  },
                }}
              >
                <FavoriteIcon
                  sx={{
                    color: "crimson",
                  }}
                />
              </Fab>
            </Box>
          </div>
          <div className="table-carts">
            {menuArray.map((item) => (
              <div className="cart-cards" key={item.id}>
                <div className="card-cart-top-container">
                  <div className="card-card-details">
                    <div className="menu-name-container">
                      <h2 className="menu-name">{item.menu_name}</h2>
                    </div>
                    <div className="menu-name-indicator-container">
                      <span className="menu-name-indicator">Menu Name</span>
                    </div>
                  </div>
                  <div className="card-cart-icon-container">
                    <div className="delete-cart-item-container">
                      <DeleteOutlineRoundedIcon className="card-cart-icon" />
                    </div>
                  </div>
                </div>
                <div className="car-cart-center-container">
                  <div className="image-wrapper">
                    <img
                      src={`http://127.0.0.1:8000/images/menu/${item.image}`}
                      alt="image"
                      className="image"
                    />
                  </div>
                </div>
                <div className="card-bottom-container">
                  <div className="menu-price-wrapper">
                    <div className="menu-price-indicator-container">
                      <span className="menu-price-indicator">Menu Price</span>
                    </div>
                    <div className="menu-price-container">
                      <h3 className="meni-price">{`₱ ${item.price}.00`}</h3>
                    </div>
                  </div>
                  <div className="select-cart-item-container">
                    <Checkbox
                      checked={selectedItems.includes(item.menuID)}
                      onChange={() => handleSelectCardItem(item.menuID)}
                    />
                  </div>
                  <div
                    className="btn-order-container"
                    onClick={() => handleOderNow(item.menuID)}
                  >
                    <button className="btn-order-now">Order Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart;
