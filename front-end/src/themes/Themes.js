import React from "react";
import {createTheme} from "@mui/material";

import {faIR} from "@mui/material/locale"

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
    },
    direction: "rtl",
}

const darkTheme = {
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
        faIR,
    )
}
