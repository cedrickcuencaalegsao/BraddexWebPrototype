import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

const WidgetDeleted = (data) => {
  let count = data.data.count;
  let deleted = data.data.deleted;
  let calc = (deleted / count) * 100;
  let val = calc.toFixed(2);
  return (
    <div className="widget-paid-wrapper">
      <div className="details-wrapper">
        <div className="title-wrapper">
          <h1 className="widget-title">Deleted Order</h1>
        </div>
        <div className="count-wrapper">
          <span className="value-indicator">Deleted Order Count</span>
          <span className="value">{deleted}</span>
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
              trailColor: "#d6d6d6",
              backgroundColor: "#3e98c7",
            })}
          />
        </div>
      </div>
    </div>
  );
};
export default WidgetDeleted;
