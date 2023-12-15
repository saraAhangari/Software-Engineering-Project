import React, {cloneElement, useEffect, useRef, useState} from "react";
import {AppBar, Button, Divider, IconButton, Menu, MenuItem, Toolbar, useTheme} from "@mui/material";
import ICON_HOME from "../../assets/images/icon_home.svg";
import ICON_LOGOUT from "../../assets/images/icon_logout.svg";
import ICON_PROFILE from "../../assets/images/icon_profile_circled.svg"
import {useNavigate} from "react-router-dom";
import DEFAULT_BACKGROUND from "../../assets/images/main_background.png";

function MainTemplate(
    {
        children,
        buttonTitle = undefined,
        onButtonClicked = () => {},
        showDefaultBackground = true,
        hasLoggedIn = false, // TODO: read from current state
        style = {},
    }
) {
    const ref = useRef(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        setHeight(ref.current.clientHeight)
    })

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const theme = useTheme();
    const navigation = useNavigate()

    function navigateToHome() {
        navigation('/')
    }

    function handleProfileIconClick(event) {
        setAnchorEl(event.currentTarget);
        setIsMenuOpen(true);
    }

    function handleMenuItemClick(item) {
        // TODO: handle action based on item
        setAnchorEl(null);
        setIsMenuOpen(false);
    }

    function handleCloseMenu() {
        setIsMenuOpen(false);
    }

    function logout() {
        // TODO: logout
    }

    return (
        <>
            <div className={'template'}
                 style={
                     {
                         backgroundImage: `url(${showDefaultBackground && DEFAULT_BACKGROUND})`
                     }
                 }
            />
            <div className={'gray-filter'}/>
            <div
                className={'container'}
                style={
                    {
                        paddingTop: height,
                    }
                }
            >
                <AppBar ref={ref} className={'appbar'}>
                    <Toolbar className={'toolbar'}>
                        <IconButton onClick={navigateToHome}>
                            <img className={'toolbar__icon'}
                                 src={ICON_HOME}
                            />
                        </IconButton>
                        <div className={'toolbar__icon-spacer'}/>
                        {
                            hasLoggedIn ? (
                                <>
                                    <IconButton onClick={handleProfileIconClick}>
                                        <img className={'toolbar__icon'}
                                             src={ICON_PROFILE}
                                        />
                                    </IconButton>
                                    <div
                                        className={'toolbar__icon-divider'}
                                        style={{backgroundColor: theme.palette.divider}}
                                    />
                                    <IconButton onClick={logout}>
                                        <img className={'toolbar__icon'}
                                             src={ICON_LOGOUT}
                                        />
                                    </IconButton>
                                </>
                            ) : (
                                buttonTitle && <Button className={'toolbar__button'}
                                                       onClick={onButtonClicked}>{buttonTitle}</Button>
                            )
                        }
                    </Toolbar>

                    <Menu
                        anchorEl={anchorEl}
                        open={isMenuOpen}
                        onClose={handleCloseMenu}
                        sx={
                            {
                                "& .MuiMenu-paper": {
                                    padding: '0',
                                    borderRadius: '5px',
                                }
                            }
                        }
                    >
                        <MenuItem>اسم کاربر</MenuItem>
                        <Divider
                            style={
                                {
                                    margin: '0',
                                }
                            }
                        />
                        <MenuItem onClick={handleMenuItemClick}>پروفایل</MenuItem>
                    </Menu>
                </AppBar>
                {
                    children && cloneElement(
                        children,
                        {
                            style: {
                                ...children.props.style,
                                flexGrow: 1
                            }
                        }
                    )
                }
            </div>
        </>
    )
}

export default MainTemplate;