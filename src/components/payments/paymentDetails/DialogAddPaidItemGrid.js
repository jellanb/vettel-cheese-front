import {Fragment, useState} from "react";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import PaymentHooks from "../../../hooks/paymentHooks";


export function DialogAddPaidItemGrid({
                                          orderDetails,
                                          setOrderDetails,
                                          open,
                                          setOpen,
                                          loadPage,
                                          setLoadPage,
                                          setContent,
}) {
    const [quoteDate, setQuoteDate] = useState();
    const [receptorName, setReceptorName] = useState();
    const [quoteAmount, setQuoteAmount] = useState();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const { newPayment: registerPayment } = PaymentHooks();
    let newPayment = {};
    let orderRequest = {};

    function toDate(dateStr) {
        const dateString = new Date(dateStr)
        return dateString
    };

    const handleSaveClick = async () => {
        const creditPaid = {
            different: orderDetails.Payment.Amount - quoteAmount,
            date: toDate(quoteDate),
            receptorName,
            amount: parseInt(quoteAmount),
        };
        orderRequest = { ...orderDetails };
        if (orderRequest.Payment.CreditPaid !== null) {
            let newPaidList = orderRequest.Payment.CreditPaid;
            newPaidList.push(creditPaid);
            newPayment = { ...orderRequest.Payment, CreditPaid: newPaidList };
        } else {
            newPayment = { ...orderRequest.Payment, CreditPaid: [creditPaid] };
        };
        orderRequest = { ...orderDetails, Payment: newPayment };
        const quoteCreated = await registerPayment(orderRequest);
        if (quoteCreated.OrderNumber !== undefined) {
            setOrderDetails(orderRequest);
            setLoadPage(loadPage+1);
            setShowSuccessMessage(true);
            setOpen(false);
            setTimeout(() => {
                setShowSuccessMessage(false);
                setContent("Payments");
            }, 2000);
        } else {
            setShowErrorMessage(true);
            setOpen(false);
            setTimeout(() => {
                setShowErrorMessage(false)
            }, 3000);
        }
    };
    const handleReceptorNameChange = (event) => {
        setReceptorName(event.target.value);
    };
    const handleAmountChange = (event) => {
        setQuoteAmount(event.target.value);
    }
    const handlePaymentDateChange = (date) => {
        setQuoteDate(toDate(date));
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
    const handleClose = () => {
        setReceptorName();
        setQuoteAmount();
        setQuoteDate();
        setOpen(false);
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
                    {"Add amount paid"}
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
                                            name="ReceptorName"
                                            label="Receptor Name"
                                            id="ReceptorName"
                                            autoFocus
                                            value={receptorName}
                                            onChange={handleReceptorNameChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="Amount"
                                            label="Amount"
                                            id="Amount"
                                            value={quoteAmount}
                                            autoFocus
                                            onChange={handleAmountChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                label="Quote Date"
                                                value={quoteDate ? null : quoteDate}
                                                autoFocus
                                                onChange={handlePaymentDateChange}
                                                renderInput={(params) => <TextField name="DeliveryName" id="DeliveryName" fullWidth {...params}  />}
                                            />
                                        </LocalizationProvider>
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