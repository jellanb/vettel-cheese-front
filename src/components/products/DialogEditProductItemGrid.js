import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {Fragment, useState} from "react";
import * as React from "react";
import ProductsHooks from "../../hooks/productsHooks";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";


export function DialogEditProductItemGrid({
                                              openDialogEditProduct,
                                              setOpenDialogEditProduct,
                                              item,
                                              setItem,
                                              loadPage,
                                              setLoadPage,
                                              description,
                                              setDescription,
                                              quantity,
                                              setQuantity,
                                              amount,
                                              setAmount
}) {
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const { updateProductByBarcode } = ProductsHooks();
    const handleClose = () => {
        setOpenDialogEditProduct(false);
    };

    const handleSaveButtonClick = async () => {
        const updateResult = await updateProductByBarcode(item);
        if (updateResult.updateDate !== undefined) {
            setLoadPage(loadPage+1);
            setShowSuccessMessage(true);
            setOpenDialogEditProduct(false);
            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 2000);
        } else {
            setShowErrorMessage(true);
            setOpenDialogEditProduct(false);

            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 3000);
        };
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
        setItem({...item, description: event.target.value});
    }

    const handleQuantityChange = (event) => {
        setQuantity(parseInt(event.target.value));
        const qty = parseInt(event.target.value);
        setItem({...item, quantity: qty});
    }

    const handleSaleAmount = (event) => {
        setAmount(parseInt(event.target.value));
        setItem({...item, saleAmount: parseInt(event.target.value)});
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
                    open={openDialogEditProduct}
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
                                                value={quantity}
                                                autoFocus
                                                onChange={handleQuantityChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                name="SaleAmount"
                                                label="Amount"
                                                id="SaleAmount"
                                                value={amount}
                                                autoFocus
                                                onChange={handleSaleAmount}
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
        )
}