import Navbar from "../../components/Navbar/Navbar";
import "./doctorPanel.css"
import NOTES from "../../assets/images/icon_notes.svg"
import CALENDER from "../../assets/images/🦆 icon _calendar_.png"
import TIME from "../../assets/images/🦆 icon _google docs_.png"
import Message from "../../assets/images/🦆 icon _message_.png"
import Inform from "../../assets/images/🦆 icon _edit pencil_.png"

function DoctorPanel(){
    return(
        <div >
            <Navbar></Navbar>
            <div className="doctorPanel">
            <div className="doctorPanel-container">
                <div className="DP-item">
                    <img src={TIME} alt="" />
                    <div>نوبت های امروز</div>
                    <Link to="/Doctors-patients">نوبت های امروز</Link>
                </div>
                <div className="DP-item">
                    <img src={CALENDER} alt="" />
                    <div>برنامه زمانی</div>
                    <Link to="/work-time">برنامه زمانی</Link>
                </div>
                <div className="DP-item">
                    <img src={Message} alt="" />
                    <div>نظرات ثبت شده</div>
                    <Link to="/doctor-comments">نظرات ثبت شده</Link>
                </div>
                <div className="DP-item">
                    <img src={Inform} alt="" />
                    <div>مشخصات پزشک</div>
                    <Link to="/doctor-information">مشخصات پزشک</Link>
                </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorPanel;