import "./table_order.scss";

const TableOrder = () => {
    return (
        <div className="tableOrder">
            <div className="top">
                <div className="rigth">
                    <div className="title">This Week Order Statistics</div>
                </div>
                <div className="left">
                    <div className="title">Monthly Order Statistics</div>
                </div>
            </div>
            <div className="bottom">
                Todays Delivery
            </div>
        </div>
    )
}

export default TableOrder