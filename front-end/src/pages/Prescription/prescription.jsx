import Navbar from "../../components/Navbar/Navbar";
import "./prescriptionStyle.css"
import NOTES from "../../assets/images/icon_notes.svg"


function Prescription(){
    return(
        <div className="">
            <Navbar></Navbar>
            <div className="profile-container">
                <div className="VisitHistoryBox">
                    <div className="VisitHistory">
                        <div className="VisitHistoryHeader">
                            <div className="VisitHistoryHeaderItem">تاریخ تجویز</div>
                            <div className="VisitHistoryHeaderItem">تاریخ اعتبار</div>
                            <div className="VisitHistoryHeaderItem">پزشک</div>
                            <div className="VisitHistoryHeaderItem">نسخه</div>
                        </div>
                        <div className="VisitHistoryData">
                            <div className="VisitHistoryHeaderItem">1402-10-12</div>
                            <div className="VisitHistoryHeaderItem">1402-10-12</div>
                            <div className="VisitHistoryHeaderItem">دکتر احسان محسنی</div>
                            <img src={NOTES} className="VisitHistoryHeaderItem VisitHistoryHeaderItemIcon" />
                        </div>
                        <div className="VisitHistoryData">
                            <div className="VisitHistoryHeaderItem">1402-10-12</div>
                            <div className="VisitHistoryHeaderItem">1402-10-12</div>
                            <div className="VisitHistoryHeaderItem">دکتر احسان محسنی</div>
                            <img src={NOTES} className="VisitHistoryHeaderItem VisitHistoryHeaderItemIcon" />
                        </div>
                        <div className="VisitHistoryData">
                            <div className="VisitHistoryHeaderItem">1402-10-12</div>
                            <div className="VisitHistoryHeaderItem">1402-10-12</div>
                            <div className="VisitHistoryHeaderItem">دکتر احسان محسنی</div>
                            <img src={NOTES} className="VisitHistoryHeaderItem VisitHistoryHeaderItemIcon" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Prescription;