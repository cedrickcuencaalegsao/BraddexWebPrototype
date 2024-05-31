import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

const ProductAvailable = (data) => {
  let count = data.data.count;
  let available = data.data.available;
  let calc = (available / count) * 100;
  let val = calc.toFixed(2);
  return (
    <div className="left">
      <div className="title-wrapper">
        <h1 className="title">MENU AVAILABLE</h1>
        <div className="details">
          <div className="indicator-wrapper">
            <span className="indicator">Count</span>
          </div>
          <div className="value-wrapper">
            <span className="value">{available}</span>
          </div>
        </div>
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
              textColor: "green",
              pathTransitionDuration: 0.5,
              pathColor: `green`,
              backgroundColor: "#3e98c7",
            })}
          />
        </div>
      </div>
    </div>
  );
};
export default ProductAvailable;
