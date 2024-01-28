import React from 'react';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {TextFieldStyle} from "./Styles";

function JalaliDatePicker(
    {
        label,
        views = ['year', 'month', 'day'],
        onDateChanged = () => {},
        style = {},
        disabled = false,
        error = undefined,
    }
) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                disabled={disabled}
                sx={
                    {
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                ...TextFieldStyle.sx,
                            },
                        },
                        ...style,
                    }
                }
                label={label}
                views={views}
                onChange={onDateChanged}
                slotProps={{
                    textField: {
                        variant: 'outlined',
                        error: error,
                        helperText: error?.message,
                    },
                }}
                // TODO: fix border radius
            />
        </LocalizationProvider>
    );
}

export default JalaliDatePicker;