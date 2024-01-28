import {Button, useTheme} from "@mui/material";
import {buttonHorizontalPadding, buttonVerticalPadding} from "./Variables";
import Spinner from "../animation/Spinner";
import {useEffect, useRef, useState} from "react";

function PrimaryButton(
    {
        text = undefined,
        style = {},
        onButtonClicked = () => {},
        isLoading = undefined,
        disabled = undefined,
    }
) {
    const theme = useTheme()

    const buttonRef = useRef(null);
    const [width, setWidth] = useState(0);
    useEffect(
        () => {
            if (buttonRef) {
                setWidth(buttonRef.current.clientWidth)
            }
        },
        [buttonRef]
    )

    return (
        <Button
            ref={buttonRef}
            disabled={isLoading || disabled}
            style={
                {
                    backgroundColor: theme.palette.primary.main,
                    color: '#F9F9F9',
                    padding: `${buttonVerticalPadding} ${buttonHorizontalPadding}`,
                    ...style,
                    width: isLoading ? width : style?.width,
                }
            }
            onClick={onButtonClicked}
        >{isLoading ? <Spinner/> : text}</Button>
    )
}

export default PrimaryButton;