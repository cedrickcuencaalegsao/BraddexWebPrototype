import "./InventoryList.scss";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const InventoryList = (args) => {
  const data = args.data;
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const createRows = (args) => {
      return args.map((items) => ({
        id: items.id,
        itemsID: items.itemID,
        name: items.name,
        price: items.price,
        quantity: items.quantity,
        image: items.image,
        isDeleted: items.isDeleted === 0 ? false : true,
        created_at: items.created_at,
        updated_at: items.updated_at,
      }));
    };

    if (data) {
      const newRows = createRows(data);

      setRows((prev) => {
        const rowsMap = new Map(prev.map((row) => [row.id, row]));

        newRows.forEach((newRow) => {
          rowsMap.set(newRow.id, newRow);
        });

        return Array.from(rowsMap.values());
      });
    }
  }, [data]);

  const columns = [
    { field: "id", headerName: "ID", width: 20 },
    { field: "itemsID", headerName: "Item ID", width: 100 },
    { field: "name", headerName: "Name", width: 100 },
    { field: "price", headerName: "Price", width: 100 },
    { field: "quantity", headerName: "Quantity", width: 100 },
    {
      field: "image",
      headerName: "Image",
      width: 180,
      sortable: false,
      description: "This column has a value getter and is not sortable",
      renderCell: (image) => {
        return (
          <div className="image-wrapper">
            <img
              src={`http://127.0.0.1:8000/images/items/${image.row.image}`}
              alt="previewPicture"
              className="images"
            />
          </div>
        );
      },
    },
    { field: "isDeleted", headerName: "Deleted", width: 120 },
    { field: "created_at", headerName: "Date Added", width: 120 },
    { field: "updated_at", headerName: "Date Updated", width: 100 },
    {
      field: "Action",
      headerName: "Action",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 60,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div className="viewButton">
              <EditOutlinedIcon />
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="inventory-list">
      <div className="table">
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
    </div>
  );
};
export default InventoryList;
