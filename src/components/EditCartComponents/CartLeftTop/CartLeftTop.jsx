import "./CartLeftTop.scss";
import { useEffect, useState } from "react";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const EditCartLeftTop = (data) => {
  const [cartData, setCartData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    let newData = data.data;
    if (newData !== null) {
      setCartData(data.data);
    }
  }, [data]);

  const deleteCartAPI = async (data) => {
    try {
      const API = await axios.post(
        "http://127.0.0.1:8000/api/cart-mark-as-deleted/",
        data
      );
      return API.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const deleteCart = async (data) => {
    let id = { cartID: data };
    const status = await deleteCartAPI(id);
    status && history.push("/cart");
  };

  return (
    <div className="edit-cart-left-top">
      <div className="title-wrapper">
        <h1 className="title">Menu Details</h1>
        <div className="icon-wrapper">
          <DeleteOutlineRoundedIcon
            className="icon"
            onClick={() => deleteCart(cartData.cartID)}
          />
        </div>
      </div>
      <div className="details-wrapper">
        <div className="image-wrapper">
          <img
            src={`http://127.0.0.1:8000/images/menu/${cartData.image}`}
            alt="menu"
            className="image"
          />
        </div>
        <div className="menu-details-wrapper">
          <div className="menu-name-wrapper">
            <span className="indicator">Menu Name</span>
            <span className="value">{cartData.menuName}</span>
          </div>
          <div className="menu-price-wrapper">
            <span className="indicator">Menu Price</span>
            <span className="value">{`₱ ${cartData.price}.00`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditCartLeftTop;
