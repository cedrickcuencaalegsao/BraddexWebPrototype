import "./table_products.scss";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const TableProducts = () => {
    const rows = [
        {
            refNo: 123456,
            menu: 'bachew',
            price: 100,
            status: 'Available',
        },
        {
            refNo: 987456,
            menu: 'bachew',
            price: 100,
            status: 'Not-Available',
        },
        {
            refNo: 145698,
            menu: 'bachew',
            price: 100,
            status: 'Limited',
        },
      ];
    
    return(
        <div className="table">
            <div className="top">
                <div className="left">
                    <div className="title">PRODUCTS AVAILABLE</div>
                </div>
                <div className="center">
                    <div className="title">PRODUCT LIMITED</div>
                </div>
                <div className="right">
                    <div className="title">PRODUCT NOT-AVAILABLE</div>
                </div>
            </div>
            <div className="bottom">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Menu Id No.</TableCell>
                            <TableCell align="right">Menu Name</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Image</TableCell>
                            <TableCell align="right">Status</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map((row) => (
                            <TableRow
                            key={row.refNo}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {row.refNo}
                            </TableCell>
                            <TableCell align="right">{row.menu}</TableCell>
                            <TableCell align="right">{row.price}</TableCell>
                            <TableCell align="right">
                                <div className="cellWrapper">
                                    <img src="#" alt="image" className="image" />
                                </div>
                            </TableCell>
                            <TableCell align="right">
                                <span className={`status ${row.status}`}>{row.status}</span>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}
export default TableProducts