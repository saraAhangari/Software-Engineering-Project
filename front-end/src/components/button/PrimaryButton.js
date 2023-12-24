import {Button, useTheme} from "@mui/material";
import {buttonHorizontalPadding, buttonVerticalPadding} from "./Variables";
import Spinner from "../animation/Spinner";

function PrimaryButton(
    {
        text = undefined,
        style = {},
        onButtonClicked = () => {},
        isLoading = undefined,
    }
) {
    const theme = useTheme()

    return (
        <Button
            disabled={isLoading}
            style={
                {
                    backgroundColor: theme.palette.primary.main,
                    color: '#F9F9F9',
                    padding: `${buttonVerticalPadding} ${buttonHorizontalPadding}`,
                    ...style,
                }
            }
            onClick={onButtonClicked}
        >{isLoading ? <Spinner/> : text}</Button>
    )
}

export default PrimaryButton;