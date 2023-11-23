import React, {useState} from "react";
import {IconButton, InputAdornment} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import CustomTextFiled from "./CustomTextField";

function CustomTextFiledWithPasswordToggle(
    {
        label,
        name = label,
        placeholder = '',
        onTextChanged = {},
        errorMessage = undefined,
    }
) {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <CustomTextFiled
            name={name}
            label={label}
            type={showPassword ? 'text' : 'password'}
            placeholder={placeholder}
            errorMessage={errorMessage}
            onTextChanged={onTextChanged}
            inputProps={
                {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                edge="end">
                                {
                                    showPassword ? <VisibilityOff/> : <Visibility/>
                                }
                            </IconButton>
                        </InputAdornment>
                    ),
                }
            }
        />
    )
}

export default CustomTextFiledWithPasswordToggle;