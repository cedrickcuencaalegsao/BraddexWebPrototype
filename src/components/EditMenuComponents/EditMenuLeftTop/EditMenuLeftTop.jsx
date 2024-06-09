import React, { useEffect, useState } from "react";

const EditMenuLeftTop = (data) => {
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    if (data !== 0) {
      setMenuData(data.data);
    }
  }, [data]);

  return (
    <div className="edit-menu-left-top">
      <span className="title">Edit Menu Left Top</span>
    </div>
  );
};
export default EditMenuLeftTop;
