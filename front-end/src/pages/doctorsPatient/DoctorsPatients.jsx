import Navbar from "../../components/Navbar/Navbar";
import "./DoctorsPatients.css"
import NOTES from "../../assets/images/icon_notes.svg";
import COMMENT from "../../assets/images/icon_message.svg"
import DOC from "../../assets/images/🦆 icon _google docs_.svg"


function DoctorsPatients(){
    return(
        <div className="">
            <Navbar></Navbar>
            <div className="profile-container">
                <div className="VisitHistoryBox">
                    <div className="VisitHistory">
                        <div className="VisitHistoryHeader">
                            <div className="VisitHistoryHeaderItem">تاریخ</div>
                            <div className="VisitHistoryHeaderItem">ساعت</div>
                            <div className="VisitHistoryHeaderItem">نام بیمار</div>
                            <div className="VisitHistoryHeaderItem">وضعیت</div>
                            <div className="VisitHistoryHeaderItem">سوابق پزشکی</div>
                            <div className="VisitHistoryHeaderItem">نسخه</div>
                        </div>
          
                        <div className="VisitHistoryData">
                            <div className="VisitHistoryHeaderItem">1402-10-12</div>
                            <div className="VisitHistoryHeaderItem">12:30</div>
                            <div className="VisitHistoryHeaderItem"> احسان محسنی</div>
                            <div className="VisitHistoryHeaderItem">انجام شده</div>
                            <img src={DOC} className="VisitHistoryHeaderItem VisitHistoryHeaderItemIcon VisitHistoryHeaderItemIcon2" />
                            <img src={NOTES} className="VisitHistoryHeaderItem VisitHistoryHeaderItemIcon" />

                        </div>

                        <div className="VisitHistoryData">
                            <div className="VisitHistoryHeaderItem">1402-10-12</div>
                            <div className="VisitHistoryHeaderItem">12:30</div>
                            <div className="VisitHistoryHeaderItem"> احسان محسنی</div>
                            <div className="VisitHistoryHeaderItem">لغو شده</div>
                            <img src={DOC} className="VisitHistoryHeaderItem VisitHistoryHeaderItemIcon VisitHistoryHeaderItemIcon2" />
                            <img src={NOTES} className="VisitHistoryHeaderItem VisitHistoryHeaderItemIcon" />

                        </div>

                        <div className="VisitHistoryData">
                            <div className="VisitHistoryHeaderItem">1402-10-12</div>
                            <div className="VisitHistoryHeaderItem">12:30</div>
                            <div className="VisitHistoryHeaderItem"> احسان محسنی</div>
                            <div className="VisitHistoryHeaderItem">رزرو</div>
                            <img src={DOC} className="VisitHistoryHeaderItem VisitHistoryHeaderItemIcon VisitHistoryHeaderItemIcon2" />
                            <img src={NOTES} className="VisitHistoryHeaderItem VisitHistoryHeaderItemIcon" />

                        </div>
                 
                     
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorsPatients;