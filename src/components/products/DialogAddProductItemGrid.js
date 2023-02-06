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
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";


export function DialogAddProductItemGrid({open, setOpen, loadPage, setLoadPage}) {
    const date = new Date().toISOString();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [newProduct, setNewProduct] = useState({ createdDate: date });
    const { generateNewProduct } = ProductsHooks();
    const typeUnitOfMeasurement = [
        {"key":0, "label":"gramos"},
        {"key":1, "label":"kilogramos"},
        {"key":2, "label":"unidad"}
    ];

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangeTypeUnitOfMeasurement = (event) =>{
        setNewProduct({ ...newProduct, unitOfMeasurement: event.target.value });
    };

    const handleSaveClick = async () => {
        console.log(JSON.stringify(newProduct));
        const newProductResult = await generateNewProduct(newProduct);
        if (newProductResult.barcode !== undefined) {
            setLoadPage(loadPage+1);
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
    }

    const handleDescriptionChange = async (event) => {
        setNewProduct({ ...newProduct, description: event.target.value });
    }

    const handleBarcodeChange = async (event) => {
        setNewProduct({ ...newProduct, barcode: event.target.value } );
    }

    const handleQuantityChange = async (event) => {
        setNewProduct( { ...newProduct, quantity: parseInt(event.target.value)} );
    }

    const handleAmountChange = async (event) => {
        setNewProduct( { ...newProduct, saleAmount: parseInt(event.target.value)} );
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
                    {"New Product"}
                </DialogTitle>
                <DialogContent>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Box component="form" noValidate sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="description"
                                            label="Description"
                                            id="description"
                                            autoFocus
                                            onChange={handleDescriptionChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="barcode"
                                            label="Bar code"
                                            id="barcode"
                                            autoFocus
                                            onChange={handleBarcodeChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="quantity"
                                            label="Quantity"
                                            id="quantity"
                                            type="number"
                                            autoFocus
                                            onChange={handleQuantityChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="Amount"
                                            label="Amount"
                                            id="number"
                                            autoFocus
                                            onChange={handleAmountChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box sx={{ minWidth: 120 }}>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Select Product</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="rolSelector"
                                                    label="Select product"
                                                    onChange={handleChangeTypeUnitOfMeasurement}
                                                >
                                                    {
                                                        typeUnitOfMeasurement.map((product, index) => (
                                                            <MenuItem key={index} value={product.label}>{product.label}</MenuItem>))
                                                    }
                                                </Select>
                                            </FormControl>

                                        </Box>
                                    </Grid>

                                </Grid>
                            </Box>
                        </Box>
                    </Container>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSaveClick} autoFocus>Save</Button>
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