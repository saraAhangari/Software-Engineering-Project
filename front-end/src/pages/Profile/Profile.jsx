import Navbar from "../../components/Navbar/Navbar";
import "./ProfileStyle.css"
import NOTES from "../../assets/images/icon_notes.svg"

function Profile(){
    return(
        <div className="">
            <Navbar></Navbar>
            <div className="profile-container">
                <div className="profiel-box">
                <div className="profile-item">
                        <div className="profileHeader">مشخصات</div>
                        <div className="profileData">
                            <div className="profileData-Item">نام‌و‌نام‌خانوادگی:</div>
                            <div className="profileData-Item">کد ملی:</div>
                            <div className="profileData-Item">تاریخ تولد:</div>
                            <div className="profileData-Item">تلفن همراه:</div>
                            <div className="profileData-Item">جنسیت:</div>
                        </div>
                    </div>
                 
                   
                    <div className="profile-item">
                        <div className="profileHeader">اطلاعات پزشکی</div>
                        <div className="profileData">
                            <div className="profileData-Item">سن:</div>
                            <div className="profileData-Item">گروه خونی:</div>
                            <div className="profileData-Item">قد:</div>
                            <div className="profileData-Item">فشار خون:</div>
                            <div className="profileData-Item">وزن:</div>
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
                                <div className="profile-VisitHistoryHeader-item">دکتر احسان محسنی</div>
                                <div className="profile-VisitHistoryHeader-item">1401-11-12</div>
                                <img className="profile-VisitHistoryHeader-noskhe" src={NOTES}/>
                            </div>
                            <div className="profile-VisitHistoryHeader profile-VisitHistoryItem">
                                <div className="profile-VisitHistoryHeader-item">دکتر احسان محسنی</div>
                                <div className="profile-VisitHistoryHeader-item">1401-11-12</div>
                                <img className="profile-VisitHistoryHeader-noskhe" src={NOTES}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;