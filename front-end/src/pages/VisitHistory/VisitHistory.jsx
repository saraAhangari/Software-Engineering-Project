import Navbar from "../../components/Navbar/Navbar";
import "./VisitHistoryStyle.css"
import NOTES from "../../assets/images/icon_notes.svg";
import COMMENT from "../../assets/images/icon_message.svg"
import { useEffect, useState } from "react";

function VisitHistory() {
    const [appointments, setAppointments] = useState(null)
    useEffect(() => {
        var token = localStorage.getItem("token")
        const getProfileData = async () => {
            try {
                var response = await fetch("http://localhost:8000/api/v1/appointments",
                    {
                        method: "GET",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    }

                );
                console.log(response)
                const responseJson = await response.json()
                console.log(responseJson)
                setAppointments(responseJson);

            } catch (e) {
                console.log(e)
            }
        }
        if (appointments == null)
            getProfileData();

    }
    )
    const statusOptions = ["Reserved", "Completed", "Cancelled"];

    const handleStatusChange = (index, newStatus) => {
        const updatedAppointments = appointments.map((appointment, i) => {
            if (i === index) {
                return { ...appointment, status: newStatus };
            }
            return appointment;
        });
        setAppointments(updatedAppointments);

    };

    return (
        <div className="">
            <Navbar></Navbar>
            <div className="profile-container">
                <div className="VisitHistoryBox">
                    <div className="VisitHistory">
                        <div className="VisitHistoryHeader">
                            <div className="VisitHistoryHeaderItem">تاریخ</div>
                            <div className="VisitHistoryHeaderItem">ساعت</div>
                            <div className="VisitHistoryHeaderItem">پزشک</div>
                            <div className="VisitHistoryHeaderItem">وضعیت</div>
                            <div className="VisitHistoryHeaderItem">ثبت نظر</div>
                            <div className="VisitHistoryHeaderItem">نسخه</div>
                        </div>
                        {/* {appointments.map((appointment, index) => (
                            <div key={index} className="VisitHistoryData">
                                <div className="VisitHistoryHeaderItem">{appointment?.appointment_time.date}</div>
                                <div className="VisitHistoryHeaderItem">{appointment?.appointment_time.start}</div>
                                <div className="VisitHistoryHeaderItem">دکتر احسان محسنی</div>
                                <div className="VisitHistoryHeaderItem">
                                    <select
                                        value={appointment.status}
                                        onChange={(e) => handleStatusChange(index, e.target.value)}
                                    >
                                        {statusOptions.map((option, optionIndex) => (
                                            <option key={optionIndex} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>
                                <img src={COMMENT} className="VisitHistoryHeaderItem VisitHistoryHeaderItemIcon" />
                                <img src={NOTES} className="VisitHistoryHeaderItem VisitHistoryHeaderItemIcon" />
                            </div>
                        ))} */}
                        <div className="VisitHistoryData">
                            <div className="VisitHistoryHeaderItem">1402-10-12</div>
                            <div className="VisitHistoryHeaderItem">12:30</div>
                            <div className="VisitHistoryHeaderItem">دکتر احسان محسنی</div>
                            <div className="VisitHistoryHeaderItem">لغو شده</div>
                            <img src={COMMENT} className="VisitHistoryHeaderItem VisitHistoryHeaderItemIcon" />
                            <img src={NOTES} className="VisitHistoryHeaderItem VisitHistoryHeaderItemIcon" />

                        </div>
                        <div className="VisitHistoryData">
                            <div className="VisitHistoryHeaderItem">1402-10-12</div>
                            <div className="VisitHistoryHeaderItem">12:30</div>
                            <div className="VisitHistoryHeaderItem">دکتر احسان محسنی</div>
                            <div className="VisitHistoryHeaderItem">رزرو</div>
                            <img src={COMMENT} className="VisitHistoryHeaderItem VisitHistoryHeaderItemIcon" />
                            <img src={NOTES} className="VisitHistoryHeaderItem VisitHistoryHeaderItemIcon" />

                        </div>

                    </div>
                </div>
            </div>
        </div >
    )
}

export default VisitHistory;