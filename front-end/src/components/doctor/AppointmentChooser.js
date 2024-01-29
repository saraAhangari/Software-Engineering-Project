import React, {useEffect, useState} from "react";
import {useTheme} from "@mui/material";
import CustomTextFiled from "../text-field/CustomTextField";
import JalaliDatePicker from "../text-field/JalaliDatePicker";
import Selector from "../text-field/Selector";
import PrimaryButton from "../button/PrimaryButton";
import {getTimeSlicesOfDoctor} from "../../data/api/TimeSliceApi";
import {safeApiCall} from "../../data/api/Api";
import {postAppointment} from "../../data/api/AppointmentsApi";

function AppointmentChooser(props) {
    const {title, style, doctorId} = props;
    const theme = useTheme();

    const pTagStyle = {
        fontSize: '0.75rem',
        marginBottom:'10px',
    }

    const [selectedDate, setSelectedDate] = useState(getNowDate);
    const [availableTimes, setAvailableTimes] = useState([]);
    const [selectedSlice, setSelectedSlice] = useState(undefined);

    function getNowDate() {
        const now = new Date();
        return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
    }

    useEffect( () => {
        getTimeSlicesOfDoctor(doctorId, selectedDate).then(slices => {
            setAvailableTimes(slices);
        }).catch(error => {
            console.log(error);
            alert('زمان های نوبت بندی مشخص نیستن. دوباره تلاش کنید.')
        });
    }, [selectedDate])

    function handlePickedTime(time) {
        const [start, end] = time.split(' - ')
        setSelectedSlice({
            "date": selectedDate,
            "start": start,
            "end": end
        })
    }

    const [isLoading, setIsLoading] = useState(false)

    function handleOnButtonClicked() {
        safeApiCall(
            postAppointment(doctorId, selectedSlice.date, selectedSlice.start, selectedSlice.end),
            setIsLoading,
            (error) => {
                alert('نوبت دهی انجام نشد')
                console.log(error);
            },
            () => {
                alert('نوبت دهی با موفقیت انجام شد')
            }
        )
    }

    return (
        <div
            style={
                {
                    padding: '10px 25px',
                    height: 'fit-content',
                    borderRadius: theme.shape.borderRadius,
                    background: theme.palette.background.paper,
                    boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.25)',
                    ...style,
                }
            }
        >
            <p
                style={
                    {
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                    }
                }
            >{title}</p>
            <div
                style={
                    {
                        width: '100%',
                        height: '1px',
                        margin: '5px 0 20px 0',
                        background: 'black'
                    }
                }
            />

            <p style={pTagStyle}>انتخاب تاریخ</p>
            <JalaliDatePicker
                type={'date'}
                name={'birthday'}
                onDateChanged={(date) => {
                    setSelectedDate(`${date.$y}-${date.$M + 1}-${date.$D}`);
                }}
            />

            <p
                style={
                    {
                        ...pTagStyle,
                        marginTop: '20px',
                    }
                }
            >انتخاب ساعت</p>
            <Selector
                style={
                    {
                        width: '100%',
                    }
                }
                name={'hour'}
                onValueChanged={handlePickedTime}
                disabled={availableTimes?.length === 0}
                menuItems={availableTimes.map(item => `${item.start} - ${item.end}`)}
            />

            <PrimaryButton
                style={
                    {
                        width: '100%',
                        margin: '30px 0 20px 0',
                    }
                }
                text={'رزرو نوبت'}
                isLoading={isLoading}
                disabled={!selectedSlice}
                onButtonClicked={handleOnButtonClicked}
            />
        </div>
    )
}

export default AppointmentChooser;