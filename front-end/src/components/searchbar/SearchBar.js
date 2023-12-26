import React from "react";
import {Box, IconButton, InputBase} from "@mui/material";
import {Search} from "@mui/icons-material";
import PrimaryButton from "../button/PrimaryButton";

function SearchBar(
    {
        placeholder,
        onTextChanged = () => {},
        onSearchButtonClicked = () => {},
        endChild = undefined,
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
            {
                endChild
            }
        </Box>
    );
}

export default SearchBar;