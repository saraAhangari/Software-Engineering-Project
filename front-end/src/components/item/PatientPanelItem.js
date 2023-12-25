import React from "react";
import {ListItemButton, useTheme} from "@mui/material";

function PatientPanelItem(props) {
    const theme = useTheme();
    const { icon, iconAlt, title, onClick } = props;

    return (
        <div
            className={'patient-panel__item'}
            style={
                {
                    borderRadius: theme.shape.borderRadius,
                    backgroundColor: theme.palette.secondary.main,
                }
            }
            onClick={onClick}
        >
            <ListItemButton
                style={
                    {
                        gap: '10px',
                        padding: '15px',
                        borderRadius: theme.shape.borderRadius,
                    }
                }
            >
                <img src={icon} alt={iconAlt}/>
                <p>{title}</p>
            </ListItemButton>
        </div>
    )
}

export default PatientPanelItem;
