import Navbar from "../../components/Navbar/Navbar";
import "./WorkTimeStyle.css"
import MainTemplate from "../../components/container/MainTemplate";
import React, { useState, useEffect } from 'react';

function WorkTime() {
    const [formData, setFormData] = useState({
        date: '',
        start: '',
        end: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/api/v1/timeslices', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setFormData({
                date: '',
                start: '',
                end: '',
            });

        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    return (
        <div >
            <MainTemplate>
                <div className="wtB">
                    <div className="vtcon">
                        <div className="vtcoon">
                            <div className="wttitle">زمان های  حضور </div>
                            <form onSubmit={handleSubmit}></form>
                            <div className="wtitleday">
                                <div>انتخاب روز</div>
                                <input type="date" name="date" value={formData?.date} onChange={handleChange} />
                            </div>
                            <div className="wttime">
                                <div>انتخاب ساعت شروع</div>
                                <div className="wttimein">
                                    <input type="time" name="start" value={formData?.start} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="wttime">
                                <div>انتخاب ساعت پایان</div>
                                <div className="wttimein">
                                    <input type="time" name="end" value={formData?.end} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="confirmBox">
                                <button type="submit" className="confirmbtn">ثبت</button>
                            </div>
                        </div>
                    </div>
                </div>
            </MainTemplate>
        </div>
    )
}

export default WorkTime;