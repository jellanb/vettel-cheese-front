import {Fragment, useEffect, useState} from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import * as React from "react";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import DispatchHooks from "../../hooks/disptachHooks";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";


export function DialogEditDispatchItem({order, setOrder, openDialog, setOpenDialog, loadPage, setLoadPage}) {
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [valueReasonSocial, setValueReasonSocial] = useState(order.Dispatch.ReasonSocial);
    const [valueDeliveryName, setValueDeliveryName] = useState(order.Dispatch.DeliveryName);
    const { modifyOrder } = DispatchHooks()

    function toDate(dateStr) {
        const dateString = new Date(dateStr)
        return dateString
    };

    useEffect(() => {
        setValueReasonSocial(order.Dispatch.ReasonSocial);
        setValueDeliveryName(order.Dispatch.DeliveryName);
    }, [order.Dispatch.ReasonSocial, order.Dispatch.DeliveryDate, order.Payment.PaymentDate, order.Dispatch.DeliveryName]);

    const handlePaymentDateChange = (date) => {
        setOrder({ ...order, Payment:{ ...order.Payment, PaymentDate: toDate(date) } });
    };

    const handleDeliveryDateChange = (date) => {
        setOrder({ ...order, Dispatch:{ ...order.Dispatch, DeliveryDate: toDate(date) } });
    };

    const handleReasonSocialChange = async (event) => {
        const ReasonSocial = event.target.value;
        setValueReasonSocial(ReasonSocial);
        setOrder({ ...order, Dispatch:{ ...order.Dispatch, ReasonSocial } });
    };

    const handleDeliveryNameChange = async (event) => {
        const DeliveryName = event.target.value;
        setValueDeliveryName(DeliveryName);
        setOrder({ ...order, Dispatch:{ ...order.Dispatch, DeliveryName } });
    }

    const handleSaveButtonClick = async () => {
        const orderUpdated = await modifyOrder(order);
        if (orderUpdated.OrderNumber !== undefined) {
            setLoadPage(loadPage+1);
            setShowSuccessMessage(true);
            setOpenDialog(false)
            setTimeout(() => {
                setShowSuccessMessage(false)
            }, 2000);
        } else {
        setShowErrorMessage(true);
        setOpenDialog(false)
        setTimeout(() => {
            setShowSuccessMessage(false)
        }, 3000);
    }
    };

    const handleClose = () => {
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
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Edit dispatch information"}
                </DialogTitle>
                <DialogContent>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box
                            sx={{
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
                                            name="ReasonSocial"
                                            value={valueReasonSocial}
                                            required
                                            fullWidth
                                            id="ReasonSocial"
                                            label="Reason Social"
                                            autoFocus
                                            onChange={handleReasonSocialChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                label="Delivery Date"
                                                value={order.Dispatch.DeliveryDate}
                                                autoFocus
                                                onChange={handleDeliveryDateChange}
                                                renderInput={(params) => <TextField name="DeliveryName" id="DeliveryName" fullWidth {...params}  />}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                label="Payment Date"
                                                value={order.Payment.PaymentDate}
                                                autoFocus
                                                onChange={handlePaymentDateChange}
                                                renderInput={(params) => <TextField name="DeliveryName" id="DeliveryName" fullWidth {...params}  />}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="DeliveryNAme"
                                            label="DeliveryNAme"
                                            value={valueDeliveryName}
                                            id="DeliveryNAme"
                                            autoFocus
                                            onChange={handleDeliveryNameChange}
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