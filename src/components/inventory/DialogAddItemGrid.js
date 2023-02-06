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
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InventoryHooks from "../../hooks/inventoryHooks";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";


export function DialogAddItemGrid({open, setOpen, productsGridData, loadPage, setLoadPage }) {
    const date = new Date().toISOString();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [ newItemInventory, setNewItemInventory ] = useState({ createdDate: date });
    const { AddItemInventory } = InventoryHooks();

    const handleCloseClick = () => {
        setOpen(false);
    };

    const handleProductSelect = (event) => {
        setNewItemInventory({ ...newItemInventory, product: event.target.value});
    };

    const handleQuantityChange = (event) => {
        setNewItemInventory({ ...newItemInventory, quantity: event.target.value});
    };

    const handleSaveClick = async () => {
        const result = await AddItemInventory(newItemInventory);
        if (result !== undefined) {
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
                setShowErrorMessage(false);
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
                    {"New inventory item"}
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
                                        <Box sx={{ minWidth: 120 }}>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Select Product</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="rolSelector"
                                                    label="Select product"
                                                    onChange={handleProductSelect}
                                                >
                                                    {
                                                        productsGridData ? productsGridData.map((product, index) => (
                                                            <MenuItem key={index} value={product}>{product.description}</MenuItem>)
                                                        ) : <Typography>nothing products to show...</Typography>
                                                    }
                                                </Select>
                                            </FormControl>

                                        </Box>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="quantity"
                                            label="quantity"
                                            id="quantity"
                                            autoFocus
                                            onChange={handleQuantityChange}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Container>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseClick}>Cancel</Button>
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