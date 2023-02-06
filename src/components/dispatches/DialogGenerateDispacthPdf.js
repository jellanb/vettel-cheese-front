import {Fragment} from "react";
import PdfDispatchGenerator from "./PdfDispatchGenerator";
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import Slide from '@mui/material/Slide';
import CloseIcon from '@mui/icons-material/Close';
import {AppBar} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function DialogGenerateDispatchPdf({open, setOpen, orderDetails}) {
    const handleClose = () =>{
        setOpen(false);
    };

    return (
        <Fragment>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <PdfDispatchGenerator orderDetails={orderDetails}></PdfDispatchGenerator>
            </Dialog>
        </Fragment>
    )
}