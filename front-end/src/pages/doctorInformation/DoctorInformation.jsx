import Navbar from "../../components/Navbar/Navbar";
import "./DoctorInformationStyle.css"
import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";


function DoctorInformation() {
    const [doctorData, setDoctorData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        var token = localStorage.getItem("token")
        const getProfileData = async () => {
            try {
                var response = await fetch("http://localhost:8000/api/v1/doctor/profile",
                    {
                        method: "GET",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    }

                );
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setDoctorData(data);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
    }
    )



    return (

        <div >
            <Navbar></Navbar>
            <div className="DIBox">
                <div className="DIcontainer">
                    <div className="dname"> اطلاعات پزشک</div>
                    <div className="dinfor">
                        <div className="dinforr">
                            <div className="dinforitem">
                                <div className="dinformitemtitle">نام</div>
                                <div className="dinformitemdata">{doctorData?.first_name}</div>
                            </div>
                            <div className="dinforitem">
                                <div className="dinformitemtitle">جنسیت</div>
                                <div className="dinformitemdata">{doctorData?.gender}</div>
                            </div>
                            <div className="dinforitem">
                                <div className="dinformitemtitle">تاریخ تولد</div>
                                <div className="dinformitemdata">{doctorData?.birthdate}</div>
                            </div>
                            <div className="dinforitem">
                                <div className="dinformitemtitle">شماره موبایل</div>
                                <div className="dinformitemdata">{doctorData?.phone_no}</div>
                            </div>
                        </div>
                        <div className="dinforr">
                            <div className="dinforitem">
                                <div className="dinformitemtitle">نام خانوادگی</div>
                                <div className="dinformitemdata">{doctorData?.last_name}</div>
                            </div>
                            <div className="dinforitem">
                                <div className="dinformitemtitle">کد ملی</div>
                                <div className="dinformitemdata">{doctorData?.national_id}</div>
                            </div>
                            <div className="dinforitem">
                                <div className="dinformitemtitle">تخصص</div>
                                <div className="dinformitemdata">{doctorData?.specialiy}</div>
                            </div>
                            <div className="dinforitem">
                                <div className="dinformitemtitle">کد نظام پزشکی</div>
                                <div className="dinformitemdata">{doctorData?.medical_system_number}</div>
                            </div>
                        </div>
                    </div>
                    <div className="backContainer">
                        <button className="backbtndd" onClick={() => navigate('/doctor-panel')}>بازگشت</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DoctorInformation;