import "./featured.scss";
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowUpOutlined from "@mui/icons-material/KeyboardArrowUpOutlined";

const Featured = () => {
    return (
        <div className="featured">
            <div className="top">
                <h1 className="title">Total Revenue</h1>
                <MoreVertOutlinedIcon fontSize="small" />
            </div>
            <div className="bottom">
                <div className="featuredChart">
                    <CircularProgressbar
                        value={70}
                        text="70%"
                        strokeWidth={10}
                        styles={buildStyles({
                            rotation: 1,
                            strokeLinecap: 'butt',
                            textSize: '20px',
                            textColor: '#008000',
                            pathTransitionDuration: 0.5,
                            pathColor: `rgb(0, 128, 0)`,
                            trailColor: '#d6d6d6',
                            backgroundColor: '#3e98c7',
                        })}
                    />
                </div>
                <p className="title">Total sales made today</p>
                <p className="ammount">$420</p>
                <p className="desc">
                    Previous transaction processing. Last Payments may not be included.
                </p>
                <div className="summary">
                    <div className="items">
                        <div className="item_title">
                            Avarage
                        </div>
                        <div className="item_result positive">
                            <KeyboardArrowUpOutlined fontSize="small" />
                            <div className="resultAmount ">
                                $12.4k
                            </div>
                        </div>
                    </div>
                    <div className="items">
                        <div className="item_title">Last Week</div>
                        <div className="item_result positive">
                            <KeyboardArrowUpOutlined fontSize="small" />
                            <div className="resultAmount">
                                $12.4k
                            </div>
                        </div>
                    </div>
                    <div className="items">
                        <div className="item_title">
                            Last Month
                        </div>
                        <div className="item_result positive">
                            <KeyboardArrowUpOutlined fontSize="small" />
                            <div className="resultAmount">
                                $12.4k
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Featured