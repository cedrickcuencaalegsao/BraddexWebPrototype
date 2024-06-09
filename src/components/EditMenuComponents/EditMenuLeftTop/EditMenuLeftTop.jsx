import React, { useEffect, useState } from "react";

const EditMenuLeftTop = (data) => {
  console.log(data.data);
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    if (data !== 0) {
      setMenuData(data.data);
    }
  }, [data]);
  console.log(menuData);

  return (
    <div className="edit-menu-left-top">
      <span className="title">Edit Menu Left Top</span>
    </div>
  );
};
export default EditMenuLeftTop;
