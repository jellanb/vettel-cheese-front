import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {Fragment, useState} from "react";
import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import ProductsHooks from "../../hooks/productsHooks";


export function DialogDeleteProductItemGrid({item, open, setOpen, loadPage, setLoadPage}) {
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const { removeProductByBarcode } = ProductsHooks();
    const handleClose = () => {
        setOpen(false);
    };

    const handleDeleteClick = async () => {
        try {
            const removeResult = await removeProductByBarcode(item.barcode)
            if (removeResult !== null) {
                setLoadPage(loadPage+1)
                setShowSuccessMessage(true);
                setOpen(false);
                setTimeout(() => {
                    setShowSuccessMessage(false)
                }, 2000);
            } else {
                setShowErrorMessage(true);
                setOpen(false);
                setTimeout(() => {
                    setShowSuccessMessage(false)
                }, 3000);
            }
        } catch (e) {
            setShowErrorMessage(true);
            setOpen(false);
            setTimeout(() => {
                setShowSuccessMessage(false)
            }, 3000);
        }

    }

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
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure if you want delete this product?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        If you press agree button this product are delete from the inventory system
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleDeleteClick} autoFocus>Delete</Button>
                </DialogActions>
            </Dialog>
            <Stack sx={{ width: '100%' }} spacing={2}>
                <Snackbar open={showErrorMessage}  onClose={handleCloseAlertsSuccessClick}>
                    <Alert onClose={handleCloseAlertsErrorClick} variant="filled" severity="error" >
                        Error deleting inventory item!
                    </Alert>
                </Snackbar>
                <Snackbar open={showSuccessMessage} onClose={handleCloseAlertsErrorClick}>
                    <Alert onClose={handleCloseAlertsSuccessClick} variant="filled" severity="success">
                        Inventory item has been deleted!
                    </Alert>
                </Snackbar>
            </Stack>
        </Fragment>
    )
}