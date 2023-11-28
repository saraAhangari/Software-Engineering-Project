import React, {useState} from "react";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';


function SimpleDialog(
    {
        children,
        style = {},
        paperProps = {},
        closeOnTouchOutside = false,
    }
) {
    const [open, setOpen] = useState(true)

    const handleClose = (event, reason) => {
        if (closeOnTouchOutside || (reason !== 'backdropClick' && reason !== 'escapeKeyDown')) {
            setOpen(false);
        }
    };

    return (
        <Dialog
            open={open}
            keepMounted
            style={style}
            PaperProps={paperProps}
            onClose={handleClose}
        >
            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    )
}

export default SimpleDialog;