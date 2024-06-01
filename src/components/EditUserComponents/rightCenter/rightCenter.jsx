import "./tightCenter.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

const ProfileRightCenter = (data) => {
  const [userUUID, setUserUUID] = useState("");
  const [dbData, setDBData] = useState([]);

  useEffect(() => {
    if (data !== null) {
      setUserUUID(data.data.userID);
    }
  }, [data]);

  const getUserDBDataAPI = async (data) => {
    try {
      const API = await axios.get(
        `http://127.0.0.1:8000/api/get-user-db-data/${data}`
      );
      setDBData(API.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userUUID != 0 || userUUID !== null) {
      getUserDBDataAPI(userUUID);
    }
  }, [userUUID]);

  let calc_order = (dbData.userOder / dbData.order) * 100;
  let calc_delivered = (dbData.delivered / dbData.order) * 100;
  let calc_cancelled = (dbData.cancelledOrder / dbData.order) * 100;
  let calc_cart = (dbData.userCart / dbData.cart) * 100;

  let userOrder = calc_order.toFixed(2);
  let delivered = calc_delivered.toFixed(2);
  let cancelled = calc_cancelled.toFixed(2);
  let cart = calc_cart.toFixed(2);

  return (
    <div className="right-center-container">
      <div className="title-wrapper">
        <h1 className="title">Order, Cart, and Delivery Overview</h1>
      </div>
      <div className="details-container">
        <div className="item-container">
          <div className="item-title-wrapper">
            <span className="item-title">USER ORDER</span>
            <span className="count">{dbData.userOder}</span>
          </div>
          <div className="graph-wrapper">
            <CircularProgressbar
              value={userOrder}
              text={`${userOrder}%`}
              strokeWidth={10}
              styles={buildStyles({
                rotation: 1,
                strokeLinecap: "butt",
                textSize: "20px",
                textColor: "#008000",
                pathTransitionDuration: 0.5,
                pathColor: `rgb(0, 128, 0)`,
                trailColor: "#d6d6d6",
                backgroundColor: "#3e98c7",
              })}
            />
          </div>
        </div>
        <div className="item-container">
          <div className="item-title-wrapper">
            <span className="item-title">DELIVERED</span>
            <span className="count">{dbData.delivered}</span>
          </div>
          <div className="graph-wrapper">
            <CircularProgressbar
              value={delivered}
              text={`${delivered}%`}
              strokeWidth={10}
              styles={buildStyles({
                rotation: 1,
                strokeLinecap: "butt",
                textSize: "20px",
                textColor: "blue",
                pathTransitionDuration: 0.5,
                pathColor: `blue`,
                trailColor: "#d6d6d6",
                backgroundColor: "#3e98c7",
              })}
            />
          </div>
        </div>
        <div className="item-container">
          <div className="item-title-wrapper">
            <span className="item-title">CANCELLED</span>
            <span className="count">{dbData.cancelledOrder}</span>
          </div>
          <div className="graph-wrapper">
            <CircularProgressbar
              value={cancelled}
              text={`${cancelled}%`}
              strokeWidth={10}
              styles={buildStyles({
                rotation: 1,
                strokeLinecap: "butt",
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
        <div className="item-container">
          <div className="item-title-wrapper">
            <span className="item-title">CART</span>
            <span className="count">{dbData.userCart}</span>
          </div>
          <div className="graph-wrapper">
            <CircularProgressbar
              value={cart}
              text={`${cart}%`}
              strokeWidth={10}
              styles={buildStyles({
                rotation: 1,
                strokeLinecap: "butt",
                textSize: "20px",
                textColor: "goldenrod",
                pathTransitionDuration: 0.5,
                pathColor: `goldenrod`,
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
export default ProfileRightCenter;
