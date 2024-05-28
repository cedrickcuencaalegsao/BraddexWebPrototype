import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

const OnlineUser = (data) => {
  let calc = (data.data.onln / data.data.count) * 100;
  let val = calc.toFixed(2);
  return (
    <div className="online-user">
      <h1 className="title">Online Users</h1>
      <div className="featuredChart">
        <CircularProgressbar
          value={val}
          text={`${val}%`}
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
      <div className="link">
        <span>Today's update</span>
      </div>
    </div>
  );
};
export default OnlineUser;
