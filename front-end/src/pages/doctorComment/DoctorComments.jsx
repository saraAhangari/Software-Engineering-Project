import Navbar from "../../components/Navbar/Navbar";
import "./DoctorCommentsStyle.css"
import CALENDER from "../../assets/images/🦆 icon _calendar_.png"






function DoctorComments() {
    return (
        <div >
            <Navbar></Navbar>
            <div className="DIBox">
                <div className="DIcontainer dccd">
                    <div className="dname"> نظرات ثبت شده</div>
                    <div className="DCcontainer">
                        <div className="DCCitem">
                            <div className="DCCitemtop">
                                <div className="DCCitemtopR">
                                    <img className="DCCitemtopRI" src={CALENDER} alt="" />
                                    <div>1402-01-23</div>
                                </div>
                                <div className="dcRate">۵.۰</div>
                            </div>
                        </div>
                        <div>دکتر بسیار با تجربه و خوش اخلاق، من تحت درمانم فعلا تا الان خیلی خوب بوده</div>
                    </div>
                    <div className="DCcontainer">
                        <div className="DCCitem">
                            <div className="DCCitemtop">
                                <div className="DCCitemtopR">
                                    <img className="DCCitemtopRI" src={CALENDER} alt="" />
                                    <div>1402-01-23</div>
                                </div>
                                <div className="dcRate">۵.۰</div>
                            </div>
                        </div>
                        <div>دکتر بسیار با تجربه و خوش اخلاق، من تحت درمانم فعلا تا الان خیلی خوب بوده</div>
                    </div>
                    <div className="DCcontainer">
                        <div className="DCCitem">
                            <div className="DCCitemtop">
                                <div className="DCCitemtopR">
                                    <img className="DCCitemtopRI" src={CALENDER} alt="" />
                                    <div>1402-01-23</div>
                                </div>
                                <div className="dcRate">۵.۰</div>
                            </div>
                        </div>
                        <div>دکتر بسیار با تجربه و خوش اخلاق، من تحت درمانم فعلا تا الان خیلی خوب بوده</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorComments;