import { DataGrid } from "@mui/x-data-grid";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const TableOrder = (data) => {
  const history = useHistory();
  const EditRow = (data) => {
    history.push(`/edit-order/${data}`);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 20 },
    { field: "orderID", headerName: "Order ID", width: 110 },
    { field: "paymentType", headerName: "Payment Type", width: 100 },
    { field: "userAddres", headerName: "Delivery Adress", width: 100 },
    { field: "totalAmmount", headerName: "Ammount", width: 100 },
    { field: "quantity", headerName: "Quantiy", width: 60 },
    { field: "isPaid", headerName: "Paid", width: 100 },
    { field: "isDelivered", headerName: "Delivered", width: 100 },
    { field: "isCancelled", headerName: "Cancelled", width: 100 },
    { field: "created_at", headerName: "Date Added", width: 100 },
    { field: "updated_at", headerName: "Date Updated", width: 100 },
    {
      field: "Action",
      headerName: "Action",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 50,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div className="viewButton">
              <EditOutlinedIcon onClick={() => EditRow(params.row.orderID)} />
            </div>
          </div>
        );
      },
    },
  ];
  let rows = data.data;
  
  return (
    <div className="tableOrder">
      <DataGrid
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

export default TableOrder;
