import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import {Fragment, useState} from "react";
import InventoryHooks from "../../hooks/inventoryHooks";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export default function DialogEditItemGrid({open, setOpen, item, setItem, loadPage, setLoadPage, description, setDescription, quantity, setQuantity}) {
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const { UpdateInventoryItem } = InventoryHooks();

    const handleClose = () => {
        setOpen(false);
        setDescription(item.product.description);
        setQuantity(item.product.quantity);
    };

    const handleSaveButtonClick = async () =>{
        const updatedResult = await UpdateInventoryItem(item);
        if (updatedResult.product !== undefined){
            setLoadPage(loadPage+1);
            setShowSuccessMessage(true);
            setOpen(false);
            setTimeout(() => {
                setShowSuccessMessage(false)
            }, 2000);
        } else {
            setShowErrorMessage(true);
            setOpen(false)
            setTimeout(() => {
                setShowSuccessMessage(false)
            }, 3000);
        }
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
        const { product } = item;
        product.description = event.target.value;
        setItem({...item, product});
    };

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
        const qty = parseInt(event.target.value);
        setItem({...item, quantity: qty});
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
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Edit item content"}
                </DialogTitle>
                <DialogContent>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Box component="form" noValidate sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            autoComplete="given-description"
                                            name="description"
                                            required
                                            fullWidth
                                            id="description"
                                            label="description"
                                            value={description}
                                            autoFocus
                                            onChange={handleDescriptionChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="quantity"
                                            label="quantity"
                                            id="quantity"
                                            autoFocus
                                            value={item.quantity}
                                            onChange={handleQuantityChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Container>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSaveButtonClick} autoFocus>Save</Button>
                </DialogActions>
            </Dialog>
            <Stack sx={{ width: '100%' }} spacing={2}>
                <Snackbar open={showErrorMessage}  onClose={handleCloseAlertsSuccessClick}>
                    <Alert onClose={handleCloseAlertsErrorClick} variant="filled" severity="error" >
                        Error updating inventory item!
                    </Alert>
                </Snackbar>
                <Snackbar open={showSuccessMessage} onClose={handleCloseAlertsErrorClick}>
                    <Alert onClose={handleCloseAlertsSuccessClick} variant="filled" severity="success">
                        User created successfully!
                    </Alert>
                </Snackbar>
            </Stack>
        </Fragment>
    );
}