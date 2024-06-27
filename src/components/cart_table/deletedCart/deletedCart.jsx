import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
const DeletedCart = (data) => {
  let val = data.data;
  return (
    <div className="deleted-cart">
      <div className="top-wrapper">
        <h1 className="title">Cart Deleted Precentage</h1>
      </div>
      <div className="bottom-wrapper">
        <div className="desc-wrapper">
          <h1 className="desc-title">Description</h1>
          <p className="desc">
            This is the number of items that were initially added to a shopping
            cart but subsequently removed by the user. In percentage, this
            metric helps in understanding user behavior regarding the removal of
            items from their cart, which can indicate indecision,
            dissatisfaction, or other factors influencing the decision to not
            purchase certain items.
          </p>
        </div>
        <div className="chart-wrapper">
          <div className="featuredChart">
            <CircularProgressbar
              value={val}
              text={`${val}%`}
              strokeWidth={10}
              styles={buildStyles({
                rotation: 1,
                strokeLinecap: "butt",
                textSize: "20px",
                textColor: "#FF0000",
                pathTransitionDuration: 0.5,
                pathColor: `#FF0000`,
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
export default DeletedCart;
