import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
const ProductNotAvailable = (data) => {
  let count = data.data.count;
  let notAvailable = data.data.notAvailable;
  let calc = (notAvailable / count) * 100;
  let val = calc.toFixed(2);
  return (
    <div className="right">
      <div className="title-wrapper">
        <h1 className="title">PRODUCT NOT-AVAILABLE</h1>
        <div className="details">
          <div className="indicator-wrapper">
            <span className="indicator">Count</span>
          </div>
          <div className="value-wrapper">
            <span className="value">{notAvailable}</span>
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
              textColor: "red",
              pathTransitionDuration: 0.5,
              pathColor: `red`,
              backgroundColor: "#3e98c7",
            })}
          />
        </div>
      </div>
    </div>
  );
};
export default ProductNotAvailable;
