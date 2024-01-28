import Navbar from "../../components/Navbar/Navbar";
import "./ProfileStyle.css"
import NOTES from "../../assets/images/icon_notes.svg"
import { useEffect, useState } from "react";

function Profile() {
    const [userData, setUserData] = useState(null)
    useEffect(() => {
        var token = localStorage.getItem("token")
        const getProfileData = async () => {
            try {
                var response = await fetch("http://localhost:8000/api/v1/patient/profile",
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
                setUserData(responseJson);

            } catch (e) {
                console.log(e)
            }
        }
        if (userData == null)
            getProfileData();

    }
    )
    return (
        <div className="">
            <Navbar></Navbar>
            {userData === null ? <div></div> :
                <div className="profile-container">
                    <div className="profiel-box">
                        <div className="profile-item">
                            <div className="profileHeader">مشخصات</div>
                            <div className="profileData">
                                <div className="profileData-Item">نام‌و‌نام‌خانوادگی:{userData?.first_name} {userData?.last_name}</div>
                                <div className="profileData-Item">کد ملی:{userData?.national_id}</div>
                                <div className="profileData-Item">تاریخ تولد:{userData?.birthdate}</div>
                                <div className="profileData-Item">تلفن همراه:0{userData?.phone_no}</div>
                                <div className="profileData-Item">جنسیت:{userData?.gender == "m" ? "آقا" : "خانم"}</div>
                            </div>
                        </div>


                        <div className="profile-item">
                            <div className="profileHeader">اطلاعات پزشکی</div>
                            <div className="profileData">
                                <div className="profileData-Item">گروه خونی:{userData?.medical_history.blood_group} </div>
                                <div className="profileData-Item">قد:{userData?.medical_history.height} </div>
                                <div className="profileData-Item">فشار خون:{userData?.medical_history.blood_pressure} </div>
                                <div className="profileData-Item">وزن:{userData?.medical_history.weight} </div>
                            </div>
                        </div>
                        <div className="profile-item">
                            <div className="profileHeader">مراجعات قبلی</div>
                            <div className="profile-VisitHistory">
                                <div className="profile-VisitHistoryHeader">
                                    <div className="profile-VisitHistoryHeader-item">نام پزشک</div>
                                    <div className="profile-VisitHistoryHeader-item">تاریخ مراجعه</div>
                                    <div className="profile-VisitHistoryHeader-noskhe">نسخه</div>
                                </div>
                                <div className="profile-VisitHistoryHeader profile-VisitHistoryItem">
                                    <div className="profile-VisitHistoryHeader-item">پزشک بیمارستان</div>
                                    <div className="profile-VisitHistoryHeader-item">{userData?.appointments.appointment_time} </div>
                                    <img className="profile-VisitHistoryHeader-noskhe" src={NOTES} />
                                </div>
                                <div className="profile-VisitHistoryHeader profile-VisitHistoryItem">
                                    <div className="profile-VisitHistoryHeader-item">پزشک بیمارستان</div>
                                    <div className="profile-VisitHistoryHeader-item">{userData?.appointments.appointment_time} </div>
                                    <img className="profile-VisitHistoryHeader-noskhe" src={NOTES} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Profile;