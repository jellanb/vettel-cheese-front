import {Fragment, useEffect, useState} from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import * as React from "react";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AutocompleteAddItem} from "./AutocompleteAddItem";
import {GridNewDispatchProducts} from "./GridNewDispatchProducts";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import AutoCompleteRegion from "./AutoCompleteRegion";
import AutoCompleteCommune from "./AutoCompleteCommune";
import DispatchHooks from "../../hooks/disptachHooks";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";


export function DialogAddDispatchItem({open, setOpen, productsGridData, loadPage, setLoadPage}) {
    const { registerNewDispatch } = DispatchHooks()
    const [newDispatchAmount, setNewDispatchAmount] = useState(0);
    const [newDispatch, setNewDispatch] = useState({});
    const [dispatchProducts, setDispatchProducts] = useState();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    useEffect(()=>{
        if (dispatchProducts) {
            const totalAmount = dispatchProducts.reduce((total, current) => total + current.saleAmount, 0);
            setNewDispatchAmount(totalAmount);
            setNewDispatch( { ...newDispatch, products: [ dispatchProducts ]});
        }
    }, [dispatchProducts]);

    const handleCloseClick = () => {
        setOpen(false);
    };

    const handleSaveClick = async () => {
        const result = await registerNewDispatch(newDispatch);
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
                setShowSuccessMessage(false)
            }, 3000);
        }
        console.log(JSON.stringify(newDispatch));
        setNewDispatch({});
    };

    const handleAddressChange = (event) => {
        setNewDispatch( { ...newDispatch, address: event.target.value } );
    };

    const handleAddressNumberChange = (event) => {
        setNewDispatch( { ...newDispatch, addressNumber: parseInt(event.target.value) } );
    };

    const handlePhoneNumberChange = (event) => {
        setNewDispatch( { ...newDispatch, phone: event.target.value } );
    };

    const handleReasonSocialChange = (event) => {
        setNewDispatch( { ...newDispatch, reasonSocial: event.target.value });
    };

    const handleRunnerNameChange = (event) => {
        setNewDispatch( { ...newDispatch, deliveryName: event.target.value });
    };

    const handlePartnerNameChange = (event) => {
        setNewDispatch( { ...newDispatch, administratorName: event.target.value });
    };

    const handleDeliveryTimeChange = (deliveryTime) => {
        setNewDispatch( {...newDispatch, deliveryDate: deliveryTime });
    };

    const handleCreditTimeChange = (creditTime) => {
        setNewDispatch( {...newDispatch, creditTime: creditTime });
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
                onClose={handleCloseClick}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"New Dispatch"}
                </DialogTitle>
                <DialogContent>
                    <Container component="main" maxWidth="lg">
                        <CssBaseline />
                        <Box
                            xs={{
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
                                            name="ReasonSocial"
                                            label="Reason Social"
                                            id="ReasonSocial"
                                            autoFocus
                                            onChange={handleReasonSocialChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="Address"
                                            label="Address"
                                            id="Address"
                                            autoFocus
                                            onChange={handleAddressChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="AddressNumber"
                                            label="Address Number"
                                            id="AddressNumber"
                                            autoFocus
                                            onChange={handleAddressNumberChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            type={"tel"}
                                            required
                                            fullWidth
                                            name="Phone"
                                            label="Phone Number"
                                            id="Phone"
                                            autoFocus
                                            onChange={handlePhoneNumberChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <AutoCompleteRegion newDispatch={newDispatch} setNewDispatch={setNewDispatch}/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <AutoCompleteCommune newDispatch={newDispatch} setNewDispatch={setNewDispatch}/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                label="Delivery Date"
                                                value={newDispatch.deliveryDate ?? null}
                                                autoFocus
                                                onChange={handleDeliveryTimeChange}
                                                renderInput={(params) => <TextField name="DeliveryName" id="DeliveryName" fullWidth {...params}  />}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                label="Credit Time"
                                                value={newDispatch.creditTime ?? null}
                                                autoFocus
                                                onChange={handleCreditTimeChange}
                                                renderInput={(params) => <TextField name="CreditTime" id="CreditTime" fullWidth {...params}  />}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="AdministratorName"
                                            label="Partner name"
                                            id="AdministratorName"
                                            autoFocus
                                            onChange={handlePartnerNameChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="RunnerName"
                                            label="Runner Name"
                                            id="RunnerName"
                                            autoFocus
                                            onChange={handleRunnerNameChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            disabled={true}
                                            required
                                            fullWidth
                                            name="Amount"
                                            label="Amount"
                                            id="number"
                                            autoFocus
                                            value={newDispatchAmount}
                                        />
                                        <Divider sx={{ my: 1 }} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1" gutterBottom>
                                            Select to add product:
                                        </Typography>
                                        <AutocompleteAddItem productsGridData={productsGridData} dispatchProducts={dispatchProducts} setDispatchProducts={setDispatchProducts}/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <GridNewDispatchProducts dispatchProducts={dispatchProducts} setDispatchProducts={setDispatchProducts}/>
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