import React from "react";
import {Box, InputBase} from "@mui/material";
import {Search} from "@mui/icons-material";

function SearchBar(
    {
        placeholder,
        onTextChanged = () => {},
    }
) {
    return (
        <Box className={'searchbar'}>
            <Search
                className={'searchbar__icon'}
                style={
                    {
                        width: '30px',
                        height: '30px',
                    }
                }
            />
            <InputBase
                className={'searchbar__input-bar'}
                type={'text'}
                inputProps={
                    {
                        style: {
                            fontSize: '28px',
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