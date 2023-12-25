import React from "react";
import {Box, IconButton, InputBase} from "@mui/material";
import {Search} from "@mui/icons-material";

function SearchBar(
    {
        placeholder,
        onTextChanged = () => {},
        onSearchButtonClicked = () => {},
    }
) {
    return (
        <Box className={'searchbar'}>
            <IconButton className={'searchbar__icon'} onClick={onSearchButtonClicked}>
                <Search sx={{color: "black"}} />
            </IconButton>
            <InputBase
                className={'searchbar__input-bar'}
                type={'text'}
                inputProps={
                    {
                        style: {
                            fontSize: '1.25rem',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            lineHeight: 'normal',
                        }
                    }
                }
                placeholder={placeholder}
                onChange={onTextChanged}
            />
        </Box>
    );
}

export default SearchBar;