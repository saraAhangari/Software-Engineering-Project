import React, {cloneElement, useEffect, useRef, useState} from "react";
import {AppBar, Button, IconButton, Toolbar, useTheme} from "@mui/material";
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
    }
) {
    const ref = useRef(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        setHeight(ref.current.clientHeight)
    })

    const theme = useTheme();
    const navigation = useNavigate()

    function navigateToHome() {
        navigation('/')
    }

    function navigateToProfile() {
        navigation('/patient-panel')
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
                                    <IconButton onClick={navigateToProfile}>
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