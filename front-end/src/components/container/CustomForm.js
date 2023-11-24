import React from "react";

function CustomForm(
    {
        children,
    }
) {
    return (
        <form>
            <div className={'form'}>
                <div className={'form__container'}>
                    {children}
                </div>
            </div>
        </form>
    )
}

export default CustomForm;