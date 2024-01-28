import React from "react";
import {useTheme} from "@mui/material";
import CustomTextFiled from "../text-field/CustomTextField";
import JalaliDatePicker from "../text-field/JalaliDatePicker";
import Selector from "../text-field/Selector";
import PrimaryButton from "../button/PrimaryButton";

function AppointmentChooser(props) {
    const {title, style} = props;
    const theme = useTheme();

    const pTagStyle = {
        fontSize: '0.75rem',
        marginBottom:'10px',
    }

    const availableTimes = [
        '12:00',
        '12:30',
        '13:00',
        '13:30',
        '14:00',
        '14:30',
        '15:00',
        '15:30',
    ]

    function handlePickedTime(time) {
        // TODO: handle the picked time
    }

    function handleOnButtonClicked() {
        // TODO
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
                menuItems={availableTimes}
                onValueChanged={handlePickedTime}
            />

            <PrimaryButton
                style={
                    {
                        width: '100%',
                        margin: '30px 0 20px 0',
                    }
                }
                text={'رزرو نوبت'}
                onButtonClicked={handleOnButtonClicked}
            />
        </div>
    )
}

export default AppointmentChooser;