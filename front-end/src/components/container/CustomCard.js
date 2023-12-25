import React from "react";

function CustomCard(
    {
        children,
        style = {},
    }
) {
    return (
        <div className={'card'}>
            <div className={'card__container'} style={style}>
                {children}
            </div>
        </div>
    )
}

export default CustomCard;