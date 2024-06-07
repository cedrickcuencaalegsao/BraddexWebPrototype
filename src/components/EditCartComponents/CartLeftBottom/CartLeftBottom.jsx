import "./CartLeftBottom.scss";
import { useEffect, useState } from "react";

const EditCartLeftBottom = (data) => {
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (data !== null) {
      setCartData(data.data);
    }
  }, [data]);

  console.log(cartData);
  return (
    <div className="edit-cart-left-bottom">
      <div className="title-wrapper">
        <h1 className="title">Update Cart</h1>
        <span>Update Image and its preview</span>
      </div>
    </div>
  );
};
export default EditCartLeftBottom;
