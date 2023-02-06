import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Fragment, useState} from "react";
import InventoryHooks from "../../hooks/inventoryHooks";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export default function DialogDeleteItemGrid({itemGrid, open, setOpen, loadPage,setLoadPage}) {
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const { RemoveInventoryItem } = InventoryHooks();

    const handleCloseClick = () => {
        setOpen(false);
    };

    const handleDeleteClick = async () => {
        const removeResult = await RemoveInventoryItem(itemGrid.product.barcode)
        if (removeResult !== null) {
            setLoadPage(loadPage+1);
            setOpen(false);
            setShowSuccessMessage(true);
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
                onClose={handleCloseClick}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure if you want delete this product?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        If you press delete button this product are deleted from the inventory system
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
    );
}