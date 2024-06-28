import "./OrderWidgets.scss";
import { useState, useEffect } from "react";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

const OrderWidgets = (args) => {
  let data = args.data;
  const [orderData, setOrderData] = useState({});
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (data) {
      setOrderData(data);
    }
  }, [data]);

  const handelCollpase = () => {
    setCollapsed(!collapsed);
  };

  const calc = (args) => {
    let value;
    if (args) {
      let result = (args / orderData.count_order) * 100;
      value = result.toFixed(2);
    }
    return value;
  };

  console.log(orderData);
  return (
    <div className="order-widgets-container">
      <div className="top">
        <div className="title">
          <span className="title">Order Statistics</span>
        </div>
        <div className="toggleButton" onClick={handelCollpase}>
          {collapsed ? <ExpandMoreOutlinedIcon /> : <ExpandLessOutlinedIcon />}
        </div>
      </div>
      <div className={`bottom ${collapsed ? "collapsed" : "not-colapsed"}`}>
        <div className="items">
          <div className="indicator-wrapper">
            <span className="indicator">Paid Order</span>
          </div>
          <div className="graph-wrapper">
            <CircularProgressbar
              className="graph"
              value={calc(orderData.is_paid)}
              text={`${calc(orderData.is_paid)}%`}
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
            <span className="indicator">Delivered Order</span>
          </div>
          <div className="graph-wrapper">
            <CircularProgressbar
              className="graph"
              value={calc(orderData.is_delivered)}
              text={`${calc(orderData.is_delivered)}%`}
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
            <span className="indicator">Cancelled Order</span>
          </div>
          <div className="graph-wrapper">
            <CircularProgressbar
              className="graph"
              value={calc(orderData.is_cancelled)}
              text={`${calc(orderData.is_cancelled)}%`}
              strokeWidth={10}
              styles={buildStyles({
                rotation: 1,
                strokeLinecap: "round",
                textSize: "20px",
                textColor: "red",
                pathTransitionDuration: 0.5,
                pathColor: `red`,
                trailColor: "#d6d6d6",
                backgroundColor: "#3e98c7",
              })}
            />
          </div>
        </div>
        <div className="items">
          <div className="indicator-wrapper">
            <span className="indicator">Deleted Order</span>
          </div>
          <div className="graph-wrapper">
            <CircularProgressbar
              className="graph"
              value={calc(orderData.is_deleted)}
              text={`${calc(orderData.is_deleted)}%`}
              strokeWidth={10}
              styles={buildStyles({
                rotation: 1,
                strokeLinecap: "round",
                textSize: "20px",
                textColor: "red",
                pathTransitionDuration: 0.5,
                pathColor: `red`,
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
export default OrderWidgets;
