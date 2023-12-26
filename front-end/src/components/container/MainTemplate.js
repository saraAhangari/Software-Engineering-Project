import React, {cloneElement, useEffect, useRef, useState} from "react";
import {AppBar, Button, Divider, IconButton, Menu, MenuItem, Toolbar, useTheme} from "@mui/material";
import ICON_HOME from "../../assets/images/icon_home.svg";
import ICON_LOGOUT from "../../assets/images/icon_logout.svg";
import ICON_PROFILE from "../../assets/images/icon_profile_circled.svg"
import {useNavigate} from "react-router-dom";
import DEFAULT_BACKGROUND from "../../assets/images/main_background.png";
import {useAuth} from "../../auth/Auth";

const PROFILE_ITEM = 1;

function MainTemplate(
    {
        children,
        showDefaultBackground = true,
        showLoginButton = true,
        style = {},
    }
) {
    const {token, logoutUser} = useAuth();

    const ref = useRef(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        setHeight(ref.current.clientHeight)
    })

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const theme = useTheme();
    const navigate = useNavigate()

    function navigateToHome() {
        navigate('/')
    }

    const navigateToLogin = () => {
        navigate('/login');
    }

    function handleProfileIconClick(event) {
        setAnchorEl(event.currentTarget);
        setIsMenuOpen(true);
    }

    function handleMenuItemClick(item) {
        switch (item.target.tabIndex) {
            case PROFILE_ITEM: {
                navigate('/patient-panel')
            }
        }
        setAnchorEl(null);
        setIsMenuOpen(false);
    }

    function handleCloseMenu() {
        setIsMenuOpen(false);
    }

    function logout() {
        logoutUser();
        navigateToHome();
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
                        ...style,
                        paddingTop: height + (style.paddingTop ? style.paddingTop : 0),
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
                            token ? (
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
                                showLoginButton && <Button
                                    className={'toolbar__button'}
                                    onClick={navigateToLogin}
                                >ورود | ثبت نام</Button>
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
                        <MenuItem tabIndex={PROFILE_ITEM} onClick={handleMenuItemClick}>پروفایل</MenuItem>
                    </Menu>
                </AppBar>
                {
                    children && cloneElement(
                        children,
                        {
                            style: {
                                flexGrow: 1,
                                ...children.props.style,
                            }
                        }
                    )
                }
            </div>
        </>
    )
}

export default MainTemplate;