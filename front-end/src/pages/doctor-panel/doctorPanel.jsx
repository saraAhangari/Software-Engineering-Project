import Navbar from "../../components/Navbar/Navbar";
import "./doctorPanel.css"
import NOTES from "../../assets/images/icon_notes.svg"
import CALENDER from "../../assets/images/🦆 icon _calendar_.png"
import TIME from "../../assets/images/🦆 icon _google docs_.png"
import Message from "../../assets/images/🦆 icon _message_.png"
import Inform from "../../assets/images/🦆 icon _edit pencil_.png"
import { useNavigate } from "react-router-dom";

function DoctorPanel() {
    const navigate = useNavigate();

    return (
        <div>
            <Navbar></Navbar>
            <div className="doctorPanel">
                <div className="doctorPanel-container">
                    <div className="DP-item" onClick={() => navigate('/doctor-patients')}>
                        <img src={TIME} alt="" />
                        <div>نوبت های امروز</div>
                    </div>
                    <div className="DP-item" onClick={() => navigate('/work-time')}>
                        <img src={CALENDER} alt="" />
                        <div>برنامه زمانی</div>
                    </div>
                    <div className="DP-item" onClick={() => navigate('/doctor-comments')}>
                        <img src={Message} alt="" />
                        <div>نظرات ثبت شده</div>
                    </div>
                    <div className="DP-item" onClick={() => navigate('/doctor-information')}>
                        <img src={Inform} alt="" />
                        <div>مشخصات پزشک</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DoctorPanel;