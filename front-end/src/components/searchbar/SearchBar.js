import React from "react";
import {Box, InputBase} from "@mui/material";
import {Search} from "@mui/icons-material";

function SearchBar(
    {
        placeholder,
        onTextChanged = {},
    }
) {
    return (
        <Box className={'searchbar'}>
            <InputBase
                className={'searchbar__input-bar'}
                dir='rtl'
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
            <Search
                className={'searchbar__icon'}
                style={
                    {
                        width: '30px',
                        height: '30px',
                    }
                }
            />
        </Box>
    );
}

export default SearchBar;