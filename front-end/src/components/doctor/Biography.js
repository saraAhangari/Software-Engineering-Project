import React from "react";
import {useTheme} from "@mui/material";

function Biography(props) {
    const {title, content, style} = props;
    const theme = useTheme();

    return (
        <div
            style={
                {
                    width: '100%',
                    padding: '10px',
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
                        margin: '5px 0',
                        background: 'black'
                    }
                }
            />
            <p
                style={
                    {
                        fontSize: '0.75rem',
                        whiteSpace: 'pre-line',
                    }
                }
            >{content}</p>
        </div>
    )
}

export default Biography;
