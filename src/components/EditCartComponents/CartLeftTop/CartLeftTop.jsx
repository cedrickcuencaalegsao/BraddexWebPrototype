import "./CartLeftTop.scss";
import { useEffect, useState } from "react";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

const EditCartLeftTop = (data) => {
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    let newData = data.data;
    if (newData !== null) {
      setCartData(data.data);
    }
  }, [data]);

  const deleteCart = (data) => {
    console.log(data);
  };

  console.log(cartData);

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
