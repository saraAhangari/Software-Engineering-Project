import React, { useState, useEffect } from 'react';
import Navbar from "../../components/Navbar/Navbar";
import "./DoctorsPatients.css"
import NOTES from "../../assets/images/icon_notes.svg";
import COMMENT from "../../assets/images/icon_message.svg"
import DOC from "../../assets/images/🦆 icon _google docs_.svg"


function DoctorsPatients(){
    const [visitHistory, setVisitHistory] = useState([]);

    useEffect(() => {
        safeApiCall(
            fetchVisitHistory(),
            setVisitHistory,
        )
    }, [])

    const fetchVisitHistory = async () => {
        try {
            const response = await fetch('/appointments');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setVisitHistory(data); 
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

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
                        {visitHistory.map((visit, index) => (
                            <div key={index} className="VisitHistoryData">
                                <div className="VisitHistoryHeaderItem">{visit.appointment_time.date}</div>
                                <div className="VisitHistoryHeaderItem">{visit.appointment_time.start}</div>
                                <div className="VisitHistoryHeaderItem">احسان محسنی</div>
                                <div className="VisitHistoryHeaderItem">{visit.status}</div>
                                <img src={DOC} className="VisitHistoryHeaderItem VisitHistoryHeaderItemIcon VisitHistoryHeaderItemIcon2" />
                                <img src={NOTES} className="VisitHistoryHeaderItem VisitHistoryHeaderItemIcon" />
                            </div>    
                        ))}

                        {/* <div className="VisitHistoryData">
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

                        </div> */}
                 
                     
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorsPatients;