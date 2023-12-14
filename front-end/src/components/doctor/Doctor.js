import React from "react";
import {Avatar, ListItemButton, useTheme} from "@mui/material";
import PrimaryButton from "../button/PrimaryButton";

function Doctor(props) {
    const {name, expertise, imagePath, buttonTitle, onItemClicked, maxWidth} = props;
    const theme = useTheme();

    return (
        <ListItemButton
            style={
                {
                    width: '100%',
                    display: 'flex',
                    padding: '15px',
                    columnGap: '15px',
                    flexDirection: 'row',
                    backgroundColor: '#fff',
                    maxWidth: `min(100%, ${maxWidth ? maxWidth : '450px'})`,
                    borderRadius: theme.shape.borderRadius,
                    boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.25)',
                }
            }
        >
            <Avatar
                alt={name}
                src={imagePath}
                sx={
                    {
                        width: '100px',
                        height: '100px',
                    }
                }
                style={
                    {
                        borderWidth: '2px',
                        borderStyle: 'solid',
                        borderColor: theme.palette.primary.main,
                    }
                }
            />

            <div
                style={
                    {
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                    }
                }
            >
                <p
                    style={
                        {
                            fontSize: '1rem',
                            fontWeight: 'bold',
                        }
                    }
                >{name}</p>
                <p
                    style={
                        {
                            fontSize: '0.75rem',
                        }
                    }
                >{expertise}</p>
                <div
                    style={
                        {
                            flexGrow: 1,
                        }
                    }
                />
                {
                    buttonTitle && <PrimaryButton
                        text={buttonTitle}
                        onButtonClicked={onItemClicked}
                        style={
                            {
                                marginTop: '5px',
                                fontWeight: 'bold',
                                borderRadius: '10px',
                            }
                        }
                    />
                }
            </div>
        </ListItemButton>
    )
}

export default Doctor;
