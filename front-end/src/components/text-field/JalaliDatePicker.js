import React from 'react';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {TextFieldStyle} from "./Styles";

function JalaliDatePicker(
    {
        label,
        views = ['year', 'month', 'day'],
        onDateChanged = () => {}
    }
) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                sx={
                    {
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                ...TextFieldStyle.sx,
                            },
                        },
                    }
                }
                label={label}
                views={views}
                onChange={onDateChanged}
                // TODO: fix border radius
            />
        </LocalizationProvider>
    );
}

export default JalaliDatePicker;