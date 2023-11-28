import React from "react";
import {TextField} from "@mui/material";
import {TextFieldStyle} from "./Styles";

function CustomTextFiled(
    {
        label,
        name = label,
        style = {},
        type = 'text',
        placeholder = '',
        onTextChanged = () => {},
        variant = 'outlined',
        errorMessage = undefined,
        inputProps = undefined,
    }
) {
    return (
        <TextField className={'text-field'}
                   type={type}
                   name={name}
                   label={label}
                   error={errorMessage}
                   helperText={<span>{errorMessage}</span>}
                   onChange={onTextChanged}
                   placeholder={placeholder}
                   InputProps={
                       {
                           ...TextFieldStyle,
                           ...inputProps,
                       }
                   }
                   style={style}
                   variant={variant}
        />
    )
}

export default CustomTextFiled;