import {Fragment, useState} from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Title from "../../../helpers/Title/Title";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import * as React from "react";
import {DialogAddPaidItemGrid} from "./DialogAddPaidItemGrid";
import moment from "moment";
import GridPayList from "./GridPayList";


//TODO:review paid list object

export function PaymentDetails({orderDetails, setOrderDetails, setContent, loadPage, setLoadPage}) {
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const handleBackButtonClick = () =>{
        setContent('Payments');
    };
    const handleAddPaidClick = () => {
        setOpenAddDialog(true);
    };
    function toDate(dateStr) {
        const dateString = moment(dateStr).format('YYYY-MM-DD');
        return dateString
    };

    return (
        <Fragment>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <Title>Payment Details</Title>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="Folio"
                                        name="Folio"
                                        label="Folio Number"
                                        value={orderDetails.Payment.Folio}
                                        fullWidth
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="DispatchNumber"
                                        name="DispatchNumber"
                                        label="Dispatch Number"
                                        value={orderDetails.OrderNumber}
                                        fullWidth
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="Date"
                                        name="Date"
                                        label="Date Emitted"
                                        value={
                                        toDate(orderDetails.Payment.DocumentDate) === '1969-12-31' ? '' : toDate(orderDetails.Payment.DocumentDate)}
                                        fullWidth
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="Amount"
                                        name="Amount"
                                        label="Amount"
                                        value={orderDetails.Payment.Amount}
                                        fullWidth
                                        variant="standard"
                                        type="number"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="NetAmount"
                                        name="NetAmount"
                                        label="Net Amount"
                                        value={orderDetails.Payment.NetAmount}
                                        fullWidth
                                        variant="standard"
                                        type="number"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="IVA"
                                        name="IVA"
                                        label="IVA"
                                        value={orderDetails.Payment.Iva}
                                        fullWidth
                                        variant="standard"
                                        type="number"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="SocialReason"
                                        name="SocialReason"
                                        label="Social Reason"
                                        value={orderDetails.Payment.ReasonSocial}
                                        fullWidth
                                        autoComplete="shipping country"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="summaryAmount"
                                        name="summaryAmount"
                                        label="Summary Amount"
                                        value={orderDetails.Payment.SummaryPaidAmount}
                                        fullWidth
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="PaidDate"
                                        name="PaidDate"
                                        label="Paid Date"
                                        value={toDate(orderDetails.Payment.PaymentDate)}
                                        fullWidth
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                        <Button variant="contained" onClick={handleBackButtonClick} component="label">
                                            Back
                                        </Button>
                                        <Button
                                            variant="contained"
                                            onClick={handleAddPaidClick}
                                            disabled={orderDetails.Payment.Status === "PAID"}
                                            component="label"
                                        >
                                            Add Paid
                                        </Button>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>

            </Container>
            <GridPayList orderDetails={orderDetails}/>
            <DialogAddPaidItemGrid
                orderDetails={orderDetails}
                setOrderDetails={setOrderDetails}
                open={openAddDialog}
                setOpen={setOpenAddDialog}
                loadPage={loadPage}
                setLoadPage={setLoadPage}
                setContent={setContent}
            />
        </Fragment>
    )
}