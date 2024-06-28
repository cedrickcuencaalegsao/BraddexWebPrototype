import "./CartWidgets.scss";
import { useEffect, useState } from "react";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

const CartWidgets = (args) => {
  let data = args.data;
  const [cartData, setCartData] = useState({});
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (data) {
      setCartData(data);
    }
  }, [data]);

  const calc = (args) => {
    let value;
    if (args !== "cart_updated") {
      let result = (args / cartData.count_cart) * 100;
      value = result.toFixed(2);
    } else {
      let result =
        ((cartData.count_cart - cartData.cart_not_updated) /
          cartData.count_cart) *
        100;
      value = result.toFixed(2);
    }
    return value;
  };

  const handelCollpase = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="cart-widgets-container">
      <div className="top">
        <div className="title-wrapper">
          <span className="title">Cart Statistics</span>
        </div>
        <div className="toggleButton" onClick={handelCollpase}>
          {collapsed ? <ExpandMoreOutlinedIcon /> : <ExpandLessOutlinedIcon />}
        </div>
      </div>
      <div className={`bottom ${collapsed ? "collapsed" : "not-colapsed"}`}>
        <div className="items">
          <div className="indicator-wrapper">
            <span className="indicator">Cart Deleted Percentage</span>
          </div>
          <div className="graph-wrapper">
            <CircularProgressbar
              value={calc(cartData.cart_deletd)}
              text={`${calc(cartData.cart_deletd)}%`}
              strokeWidth={10}
              styles={buildStyles({
                rotation: 1,
                strokeLinecap: "round",
                textSize: "20px",
                textColor: "green",
                pathTransitionDuration: 0.5,
                pathColor: `green`,
                trailColor: "#d6d6d6",
                backgroundColor: "#3e98c7",
              })}
            />
          </div>
        </div>
        <div className="items">
          <div className="indicator-wrapper">
            <span className="indicator">Cart Not Deleted</span>
          </div>
          <div className="graph-wrapper">
            <CircularProgressbar
              value={calc(cartData.cart_not_deleted)}
              text={`${calc(cartData.cart_not_deleted)}%`}
              strokeWidth={10}
              styles={buildStyles({
                rotation: 1,
                strokeLinecap: "round",
                textSize: "20px",
                textColor: "green",
                pathTransitionDuration: 0.5,
                pathColor: `green`,
                trailColor: "#d6d6d6",
                backgroundColor: "#3e98c7",
              })}
            />
          </div>
        </div>
        <div className="items">
          <div className="indicator-wrapper">
            <span className="indicator">Cart Not Updated</span>
          </div>
          <div className="graph-wrapper">
            <CircularProgressbar
              value={calc(cartData.cart_not_updated)}
              text={`${calc(cartData.cart_not_updated)}%`}
              strokeWidth={10}
              styles={buildStyles({
                rotation: 1,
                strokeLinecap: "round",
                textSize: "20px",
                textColor: "green",
                pathTransitionDuration: 0.5,
                pathColor: `green`,
                trailColor: "#d6d6d6",
                backgroundColor: "#3e98c7",
              })}
            />
          </div>
        </div>
        <div className="items">
          <div className="indicator-wrapper">
            <span className="indicator">Cart Updated</span>
          </div>
          <div className="graph-wrapper">
            <CircularProgressbar
              value={calc("cart_updated")}
              text={`${calc("cart_updated")}%`}
              strokeWidth={10}
              styles={buildStyles({
                rotation: 1,
                strokeLinecap: "round",
                textSize: "20px",
                textColor: "green",
                pathTransitionDuration: 0.5,
                pathColor: `green`,
                trailColor: "#d6d6d6",
                backgroundColor: "#3e98c7",
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartWidgets;
