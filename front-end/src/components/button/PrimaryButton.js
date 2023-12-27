import {Button, useTheme} from "@mui/material";
import {buttonHorizontalPadding, buttonVerticalPadding} from "./Variables";

function PrimaryButton(
    {
        text = undefined,
        style = {},
        onButtonClicked = () => {},
    }
) {
    const theme = useTheme()

    return (
        <Button
            style={
                {
                    backgroundColor: theme.palette.primary.main,
                    color: '#F9F9F9',
                    padding: `${buttonVerticalPadding} ${buttonHorizontalPadding}`,
                    ...style,
                }
            }
            onClick={onButtonClicked}
        >{text}</Button>
    )
}

export default PrimaryButton;