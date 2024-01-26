import Navbar from "../../components/Navbar/Navbar";
import "./WorkTimeStyle.css"






function WorkTime() {
    return (
        <div >
            <Navbar></Navbar>
            <div className="wtB">
                <div className="vtcon">
                    <div className="wttitle">زمان های  حضور </div>
                    <div className="wtitleday">
                        <div>انتخاب روز</div>
                        <input type="text" />
                    </div>
                    <div className="wttime">
                        <div>
                        انتخاب ساعت شروع
                        </div>
                        <div className="wttimein">
                            <input type="number" />
                            <div>:</div>
                            <input type="number" />
                        </div>
                    </div>
                    <div className="wttime">
                        <div>
                        انتخاب ساعت پایان
                        </div>
                        <div className="wttimein">
                            <input type="number" />
                            <div>:</div>
                            <input type="number" />
                        </div>
                    </div>
                    <div className="confirmBox">
                        <div className="confirmbtn">ثبت</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WorkTime;