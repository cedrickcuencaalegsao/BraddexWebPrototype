import React from "react";
import "./EditMenuLeftBottom.scss";
import Switch from "@mui/material/Switch";

const EditMenuLeftBottom = (data) => {
  console.log(data.data);
  return (
    <div className="edit-menu-left-bottom">
      <div className="items">
        <Switch className="icon"/>
        <span className="indicator Available">Available</span>
      </div>
      <div className="items">
        <Switch className="icon"/>
        <span className="indicator Limited">Limited</span>
      </div>
      <div className="items">
        <Switch className="icon"/>
        <span className="indicator Not-Available">Not Available</span>
      </div>
    </div>
  );
};

export default EditMenuLeftBottom;
