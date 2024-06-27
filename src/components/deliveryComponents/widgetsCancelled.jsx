import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

const WidgetsDeliveryCancelled = (data) => {
  let count = data.data.count;
  let cancelled = data.data.cancelled;
  let calc = (cancelled / count) * 100;
  let val = calc.toFixed(2);
  return (
    <div className="widgets-delivery">
      <div className="details-wrapper">
        <div className="title-wrapper">
          <h1 className="widget-title">Widgets Delivery Cancelled</h1>
        </div>
        <div className="count-wrapper">
          <span className="value-indicator">
            Widgets Delivery Cancelled Count
          </span>
          <span className="value">{`${cancelled}/${count}`}</span>
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
export default WidgetsDeliveryCancelled;
