import {Fragment, useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import * as React from "react";
import DispatchHooks from "../../hooks/disptachHooks";


export default function DialogDeleteDispatchItem({ order, openDialog, setOpenDialog, loadPage, setLoadPage }) {
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const { deleteOrderByDispatch } = DispatchHooks();

    const handleDeleteClick = async () => {
        console.log(order);
        const deleteResult = await deleteOrderByDispatch(order);
        if (deleteResult !== null) {
            setLoadPage(loadPage+1);
            setShowSuccessMessage(true);
            setOpenDialog(false);
            setTimeout(() => {
                setShowSuccessMessage(false)
            }, 2000);
        } else {
            setShowErrorMessage(true);
            setOpenDialog(false);
            setTimeout(() => {
                setShowSuccessMessage(false)
            }, 3000);
        }
    };

    const handleCloseClick = () => {
        setOpenDialog(false);
    };
    const handleCloseAlertsSuccessClick = (event, reason) => {
        setShowSuccessMessage(false);
        if (reason === 'clickaway') {
            return;
        }
    };
    const handleCloseAlertsErrorClick = (event, reason) => {
        setShowErrorMessage(false);
        if (reason === 'clickaway') {
            return;
        }
    };

    return (
        <Fragment>
            <Dialog
                open={openDialog}
                onClose={handleCloseClick}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure if you want delete this product?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        If you press delete button, you are deleting all order from the system.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseClick}>Cancel</Button>
                    <Button onClick={handleDeleteClick} autoFocus>Delete</Button>
                </DialogActions>
            </Dialog>
            <Stack sx={{ width: '100%' }} spacing={2}>
                <Snackbar open={showErrorMessage}  onClose={handleCloseAlertsSuccessClick}>
                    <Alert onClose={handleCloseAlertsErrorClick} variant="filled" severity="error" >
                        Error deleting dispatch and order item!
                    </Alert>
                </Snackbar>
                <Snackbar open={showSuccessMessage} onClose={handleCloseAlertsErrorClick}>
                    <Alert onClose={handleCloseAlertsSuccessClick} variant="filled" severity="success">
                        Dispatch and order has been deleted!
                    </Alert>
                </Snackbar>
            </Stack>
        </Fragment>
    )
}