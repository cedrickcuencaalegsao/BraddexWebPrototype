import React from "react";
import "./deliverylist.scss";
import { DataGrid } from "@mui/x-data-grid";

const DeliveryList = (data) => {
  const columns = [
    { field: "id", headerName: "ID", width: 20 },
    { field: "orderID", headerName: "Order ID", width: 150 },
    { field: "userID", headerName: "Own By", width: 80 },
    { field: "menuID", headerName: "Menu ID", width: 80 },
    { field: "paymentType", headerName: "Payment Type", width: 80 },
    { field: "userAddress", headerName: "Delivery Adress", width: 80 },
    { field: "totalAmmount", headerName: "Ammount", width: 100 },
    { field: "quantity", headerName: "Quantiy", width: 80 },
    { field: "isCancelled", headerName: "Cancelled", width: 80 },
    { field: "created_at", headerName: "Date Added", width: 100 },
    { field: "updated_at", headerName: "Date Updated", width: 100 },
  ];
  let rows = data.data;
  return (
    <div className="deliveryList">
      <DataGrid className="table"
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[0, 11]}
        checkboxSelection
      />
    </div>
  );
};
export default DeliveryList;
