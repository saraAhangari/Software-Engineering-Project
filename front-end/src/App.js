import React, {useMemo, useState} from 'react';
import Router from "./router/Router";
import {Theme, getTheme} from "./themes/Themes";
import {ThemeProvider} from "@mui/material";

function App() {
    const [mode, setMode] = useState(Theme.LIGHT_THEME);
    const theme = useMemo(() => getTheme(mode), [mode])

    return (
        <ThemeProvider theme={theme}>
            <Router/>
        </ThemeProvider>
    )
}

export default App;
