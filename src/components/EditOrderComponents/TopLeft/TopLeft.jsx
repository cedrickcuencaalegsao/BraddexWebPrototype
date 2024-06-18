import { useEffect, useState } from "react";

const EditOrderTopLeft = (data) => {
  const data_top = data.data;
  const [dataTop, setDataTop] = useState([]);

  useEffect(() => {
    if (data_top) {
      setDataTop(data_top);
    }
  }, [data_top]);

  if (dataTop.length !== 0) {
    console.log(dataTop);
  }

  return (
    <div className="edit-order-top-left">
      <div className="title-wapper">
        <span className="title">Ordered Menu</span>
      </div>
    </div>
  );
};
export default EditOrderTopLeft;
