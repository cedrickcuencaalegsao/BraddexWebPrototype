import { useEffect, useState } from "react";

const ClientSettingTopLeft = (args) => {
  let data = args.data;
  const [useData, setUserData] = useState([]);
  useEffect(() => {
    setUserData(data);
  }, [data]);
  console.log(useData);
  return (
    <div className="settings-top-left">
      <div className="title-wrapper">
        <span>title</span>
      </div>
    </div>
  );
};
export default ClientSettingTopLeft;
