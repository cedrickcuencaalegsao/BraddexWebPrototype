import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
const ProductLimited = (data) => {
  let count = data.data.count;
  let limited = data.data.limited;
  let calc = (limited / count) * 100;
  let val = calc.toFixed(2);
  return (
    <div className="center">
      <div className="title-wrapper">
        <h1 className="title">PRODUCT LIMITED</h1>
        <div className="details">
          <div className="indicator-wrapper">
            <span className="indicator">Count</span>
          </div>
          <div className="value-wrapper">
            <span className="value">{limited}</span>
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
              textColor: "goldenrod",
              pathTransitionDuration: 0.5,
              pathColor: `goldenrod`,
              backgroundColor: "#3e98c7",
            })}
          />
        </div>
      </div>
    </div>
  );
};
export default ProductLimited;
