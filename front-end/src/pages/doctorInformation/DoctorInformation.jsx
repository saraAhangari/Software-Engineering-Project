import Navbar from "../../components/Navbar/Navbar";
import "./DoctorInformationStyle.css"







function DoctorInformation() {
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
                            <div className="dinformitemdata"></div>
                        </div>
                        <div className="dinforitem">
                            <div className="dinformitemtitle">جنسیت</div>
                            <div className="dinformitemdata"></div>
                        </div>
                        <div className="dinforitem">
                            <div className="dinformitemtitle">تاریخ تولد</div>
                            <div className="dinformitemdata"></div>
                        </div>
                        <div className="dinforitem">
                            <div className="dinformitemtitle">شماره موبایل</div>
                            <div className="dinformitemdata"></div>
                        </div>
                    </div>
                    <div className="dinforr">
                        <div className="dinforitem">
                            <div className="dinformitemtitle">نام خانوادگی</div>
                            <div className="dinformitemdata"></div>
                        </div>
                        <div className="dinforitem">
                            <div className="dinformitemtitle">کد ملی</div>
                            <div className="dinformitemdata"></div>
                        </div>
                        <div className="dinforitem">
                            <div className="dinformitemtitle">تخصص</div>
                            <div className="dinformitemdata"></div>
                        </div>
                        <div className="dinforitem">
                            <div className="dinformitemtitle">کد نظام پزشکی</div>
                            <div className="dinformitemdata"></div>
                        </div>
                    </div>
                </div>
                <div className="backContainer">
                    <div className="backbtndd">بازگشت</div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default DoctorInformation;