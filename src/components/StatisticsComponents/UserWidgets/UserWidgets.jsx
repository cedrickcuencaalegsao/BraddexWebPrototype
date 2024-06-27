import "./UserWidgets.scss";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { useState } from "react";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";

const UserWidgets = (args) => {
  let data = args.data;
  const [collapsed, setCollapsed] = useState(false);

  let online_per = (data.online_user / data.count_user) * 100;
  let offline_per = (data.offline_user / data.count_user) * 100;
  let activeAcc_per = (data.active_account / data.count_user) * 100;
  let inactiveAcc_per = (data.inactive_account / data.count_user) * 100;
  let withoutAdd_per = (data.without_address / data.count_user) * 100;
  let withoutPh_per = (data.without_phone / data.count_user) * 100;
  let withoutProf_per = (data.without_profile / data.count_user) * 100;

  const handelCollpase = () => {
    setCollapsed(!collapsed);
  };

  // console.log(data);

  return (
    <div className="user-widgets-container">
      <div className="top">
        <div className="title-wrapper">
          <span className="title">User Statistics</span>
        </div>
        <div className="toggleButton" onClick={handelCollpase}>
          {collapsed ? <ExpandMoreOutlinedIcon /> : <ExpandLessOutlinedIcon />}
        </div>
      </div>
      <div className={`bottom ${collapsed ? "collapsed" : "not-colapsed"}`}>
        <div className="item">
          <div className="indicator-wrapper">
            <span className="indicator">Online User Stats</span>
          </div>
          <div className="graph-wrapper">
            <CircularProgressbar
              value={online_per}
              text={`${online_per.toFixed(2)}%`}
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
        <div className="item">
          <div className="indicator-wrapper">
            <span className="indicator">Offline User Stats</span>
          </div>
          <div className="graph-wrapper">
            <CircularProgressbar
              value={offline_per}
              text={`${offline_per.toFixed(2)}%`}
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
        <div className="item">
          <div className="indicator-wrapper">
            <span className="indicator">Active Account Stats</span>
          </div>
          <div className="graph-wrapper">
            <CircularProgressbar
              value={activeAcc_per}
              text={`${activeAcc_per.toFixed(2)}%`}
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
        <div className="item">
          <div className="indicator-wrapper">
            <span className="indicator">Inactive Account Stats</span>
          </div>
          <div className="graph-wrapper">
            <CircularProgressbar
              value={inactiveAcc_per}
              text={`${inactiveAcc_per.toFixed(2)}%`}
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
        <div className="item">
          <div className="indicator-wrapper">
            <span className="indicator">Account Without Address </span>
          </div>
          <div className="graph-wrapper">
            <CircularProgressbar
              value={withoutAdd_per}
              text={`${withoutAdd_per.toFixed(2)}%`}
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
        <div className="item">
          <div className="indicator-wrapper">
            <span className="indicator">Account Without Phone Number </span>
          </div>
          <div className="graph-wrapper">
            <CircularProgressbar
              value={withoutPh_per}
              text={`${withoutPh_per.toFixed(2)}%`}
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
        <div className="item">
          <div className="indicator-wrapper">
            <span className="indicator">Account without profile pic </span>
          </div>
          <div className="graph-wrapper">
            <CircularProgressbar
              value={withoutProf_per}
              text={`${withoutProf_per.toFixed(2)}%`}
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

export default UserWidgets;
