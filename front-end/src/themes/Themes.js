import React from "react";
import {createTheme} from "@mui/material";

export const Theme = {
    LIGHT_THEME: 'light',
    DARK_THEME: 'dark',
}

const lightTheme = {
    palette: {
        mode: Theme.LIGHT_THEME,
        primary: {
            main: '#23408E',
        },
        secondary: {
            main: '#D9D9D9',
        },
        divider: "#385399",
    },
    direction: "rtl",
    shape: {
        borderRadius: '15px',
    }
}

const darkTheme = {
    ...lightTheme,
    palette: {
        mode: Theme.DARK_THEME,
        primary: {
            main: lightTheme.palette.primary.main, // TODO: change the color
        },
        secondary: {
            main: lightTheme.palette.secondary.main, // TODO: change the color
        }
    },
    direction: "rtl",
}

export function getTheme(mode) {
    const themeOptions = (mode === Theme.LIGHT_THEME ? lightTheme : darkTheme)
    return createTheme(
        themeOptions,
    )
}
