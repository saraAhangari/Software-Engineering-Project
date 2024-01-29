import React from 'react';
import { Button, useTheme } from "@mui/material";
import { buttonHorizontalPadding, buttonVerticalPadding } from "./Variables";

function SecondaryButton(
    {
        text = undefined,
        style = {},
        onButtonClicked = () => { },
    }
) {
    const theme = useTheme()

    return (
        <Button
            style={
                {
                    ...style,
                    backgroundColor: theme.palette.secondary.main,
                    color: '#000000',
                    padding: `${buttonVerticalPadding} ${buttonHorizontalPadding}`,
                }
            }
            onClick={onButtonClicked}
        >{text}</Button>
    )
}

export default SecondaryButton;