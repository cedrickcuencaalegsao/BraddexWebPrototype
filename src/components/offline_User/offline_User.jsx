import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

const OfflineUser = (data) => {
  let calc = (data.data.ofln / data.data.count) * 100;
  let val = calc.toFixed(2);
  return (
    <div className="offline-user">
      <h1 className="title">Offline Users</h1>
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

export default OfflineUser;
