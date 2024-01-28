import React, {useEffect, useState} from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./DoctorCommentsStyle.css"
import CALENDER from "../../assets/images/🦆 icon _calendar_.png"

function DoctorComments() {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        var token = localStorage.getItem("token")
        const fetchComments = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/v1/doctor/comments',
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
                console.log(response)
                const data = await response.json();
                console.log(data)
                setComments(data);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        }})

    return (
        <div >
            <Navbar></Navbar>
            <div className="DIBox">
                <div className="DIcontainer dccd">
                    <div className="dname"> نظرات ثبت شده</div>
                    <div className="DCcontainer">
                        {comments.map((comment, index) => (
                            <div key={index} className="DCCitem">

                                
                                {}
                                <div className="DCCitemtop">
                                    <div className="DCCitemtopR">
                                        <img className="DCCitemtopRI" src={CALENDER} alt="" />
                                        <div>{comment.created}</div>
                                    </div>
                                    <div className="dcRate">{comment.point}</div>
                                </div>
                                <div>{comment.treatement_experience}</div>
                            </div>
                        ))}
                        {/* <div>دکتر بسیار با تجربه و خوش اخلاق، من تحت درمانم فعلا تا الان خیلی خوب بوده</div>
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
                        <div>دکتر بسیار با تجربه و خوش اخلاق، من تحت درمانم فعلا تا الان خیلی خوب بوده</div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorComments;