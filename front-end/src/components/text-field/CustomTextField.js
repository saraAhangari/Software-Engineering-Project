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
        disabled = false,
        defaultValue = undefined,
    }
) {
    return (
        <TextField className={'text-field'}
                   disabled={disabled}
                   type={type}
                   name={name}
                   defaultValue={defaultValue}
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