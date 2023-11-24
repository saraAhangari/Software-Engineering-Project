import React, {cloneElement, useEffect, useRef, useState} from "react";
import {AppBar, Button, Toolbar} from "@mui/material";

function MainTemplate(
    {
        children,
        buttonTitle = undefined,
        onButtonClicked = () => {},
    }
) {
    const ref = useRef(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        setHeight(ref.current.clientHeight)
    })

    return (
        <div className={'template'}>
            <div className={'template__gray-filter'}>
                <div className={'container'}>
                    <AppBar ref={ref} className={'appbar'}>
                        <Toolbar className={'toolbar'}>
                            {buttonTitle && <Button className={'button'} onClick={onButtonClicked}>{buttonTitle}</Button>}
                        </Toolbar>
                    </AppBar>
                    {
                        children && cloneElement(
                            children,
                            {
                                style: {
                                    ...children.props.style,
                                    marginTop: (children.marginTop ? children.marginTop : 0) + height,
                                    flexGrow: 1
                                }
                            }
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default MainTemplate;