import React, {useState} from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

function Selector(
    {
        label,
        name,
        menuItems,
        onValueChanged = () => {},
    }
) {
    const [value, setValue] = useState();

    function handleChange(event) {
        const newValue = event.target.value
        setValue(newValue)
        onValueChanged(newValue)
    }

    return (
        <FormControl fullWidth>
            <InputLabel>{label}</InputLabel>
            <Select
                // TODO: fix the icon and replace the default one
                // IconComponent={
                //     () => {
                //         return (
                //             <ReactSVG src={ArrowDown} width={'35px'} height={'17.5px'}/>
                //         )
                //     }
                // }
                value={value}
                label={label}
                name={name}
                onChange={handleChange}
                style={
                    {
                        borderRadius: '15px',
                        color: 'rgba(0, 0, 0, 0.52)',
                        background: 'var(--light-gray, #F9F9F9)',
                    }
                }
            >
                {
                    menuItems && menuItems.map(item => {
                        return (
                            <MenuItem value={item}>{item}</MenuItem>
                        )
                    })
                }
            </Select>
        </FormControl>
    )
}

export default Selector;
