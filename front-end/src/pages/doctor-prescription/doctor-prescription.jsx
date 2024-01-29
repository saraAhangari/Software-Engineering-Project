import Navbar from "../../components/Navbar/Navbar";
import "./doctor-prescription.css"
import plusIcon from '../../assets/images/plus-svgrepo-com.svg';
import arrowIcon from '../../assets/images/arrow-drop-down-svgrepo-com.svg';
import { useEffect, useState } from "react";


function DoctorPrescription() {
    const [userData, setUserData] = useState(null)
    const [records, setRecords] = useState(null)
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
    })

    const handleAddDrug = () => {
        const newRecord = {
            isOPen: false,
            selectedDrug: null,
        };
        setRecords(prevRecords => [...prevRecords, newRecord])
    }

    const toggleDropdown = (index) => {
        setRecords(records.map((record, i) => {
            if (i == index) {
                return { ...record, isOPen: !record.isOPen };
            }
            return record;
        }));
    }

    const selectDropdownItem = (index, value) => {
        setRecords(records.map((record, i) => {
            if (i == index) {
                return { ...record, selectedDrug: value, isOPen: false };
            }
        }))
    }

    return (
        <div className="">
            <Navbar></Navbar>
            <div className="profile-container">
                <div className="profiel-box">
                    <div className="profile-item">
                        <div className="profileHeader">مشخصات</div>
                        <div className="profileData">
                            <div className="profileData-Item">نام‌ و‌ نام‌خانوادگی:{userData?.first_name} {userData?.last_name}</div>
                            <div className="profileData-Item">کد ملی:{userData?.national_id}</div>
                            <div className="profileData-Item">تاریخ تولد بیمار:{userData?.birthdate}</div>
                            <div className="profileData-Item">پزشک معالج:{userData?.phone_no}</div>
                            <div className="profileData-Item">تاریخ صدور نسخه:{userData?.gender}</div>
                            <div className="profileData-Item">نوع بیمه:{userData?.assurance}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="profile-container">
                <div className="profiel-box">
                    <div className="profile-item">
                        <div className="profileHeader">توضیحات</div>
                        <div className="profileData">
                            <div className="vtcon">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="profile-container">
                <div className="profiel-box">
                    <div className="profile-item">
                        <div className="profileHeader">نسخه الکترونیکی</div>
                    </div>
                </div>
            </div>
            <div className="profile-container">
                <div className="profiel-box">
                    <div className="profile-item">
                        <div className="drug-container">
                            <div className="drug-title">دارو</div>
                            <img src={plusIcon} alt="+" className="plus-icon" onClick={handleAddDrug} />
                        </div>

                        {records.map((record, index) => (
                            <div key={index} className="record-item">
                                <div onClick={() => toggleDropdown(index)} className="dropdown-arrow-container">
                                    <img src={arrowIcon} alt="dropdown" className="dropdown-arrow" />
                                </div>
                                {record.isOPen && (
                                    <div className="dropdown-list">
                                        <div onClick={() => selectDropdownItem(index, 'Item 1')}>استامینوفن</div>
                                        <div onClick={() => selectDropdownItem(index, 'Item 2')}>بتامتازون</div>
                                        <div onClick={() => selectDropdownItem(index, 'Item 3')}>کدئین</div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorPrescription;