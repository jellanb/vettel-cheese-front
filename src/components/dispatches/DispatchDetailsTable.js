import {Fragment, useState} from "react";
import Title from "../../helpers/Title/Title";
import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import ReceiptIcon from '@mui/icons-material/Receipt';
import DialogGenerateDispatchPdf from "./DialogGenerateDispacthPdf";
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import DispatchHooks from "../../hooks/disptachHooks";

export function DispatchDetailsTable({orderDetails, setContent, setOrderDetails, loadPage, setLoadPage}) {
    const {modifyOrder} = DispatchHooks();
    const [open, setOpen] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const handleBackButtonClick = () =>{
        setContent('Dispatches');
    };
    const handlePdfClick = () => {
        console.log(orderDetails)
        setOpen(true);
    };

    const handleDeliveredClick = async () => {
        const order = {...orderDetails, Dispatch: {...orderDetails.Dispatch, Status: "DELIVERED"}}
        await setOrderDetails(order);
        await console.log(JSON.stringify(order));
        const orderUpdated = await modifyOrder(order);
        if (orderUpdated.OrderNumber !== undefined) {
            setLoadPage(loadPage + 1);
            setShowSuccessMessage(true);
            setTimeout(() => {
                setShowSuccessMessage(false)
            }, 2000);
        } else {
            setShowErrorMessage(true);
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
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    {/* Recent Orders */}
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <Title>Dispatch Details</Title>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="deliveryNumber"
                                        name="deliveryNumber"
                                        label="delivery Number"
                                        value={orderDetails.OrderNumber}
                                        fullWidth
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="SocialReason"
                                        name="SocialReason"
                                        label="Social Reason"
                                        value={orderDetails.ReasonSocial}
                                        fullWidth
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="Administrator"
                                        name="Administrator"
                                        label="Administrator"
                                        value={orderDetails.Dispatch.AdministratorName}
                                        fullWidth
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="address1"
                                        name="address1"
                                        label="Address"
                                        value={orderDetails.Dispatch.Address }
                                        fullWidth
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="Phone"
                                        name="Phone"
                                        label="Phone"
                                        value={orderDetails.Dispatch.Phone}
                                        fullWidth
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="Commune"
                                        name="Commune"
                                        label="Commune"
                                        value={orderDetails.Dispatch.Commune}
                                        fullWidth
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="AddressNumber"
                                        name="AddressNumber"
                                        label="Address Number"
                                        value={orderDetails.Dispatch.AddressNumber}
                                        fullWidth
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="Region"
                                        name="Region"
                                        label="Region"
                                        value={orderDetails.Dispatch.Region}
                                        fullWidth
                                        autoComplete="shipping country"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                        <Button variant="contained" onClick={handleBackButtonClick} component="label">
                                            Back
                                        </Button>
                                    </Stack>
                                </Grid>
                                <Grid item xs={3}>
                                    <Stack direction="row"  spacing={2}>
                                        <Button variant="contained" color="success" component="label" onClick={handlePdfClick}>
                                            <ReceiptIcon />Dispatch Guide
                                        </Button>
                                    </Stack>
                                </Grid>
                                <Grid item xs={3}>
                                    <Stack direction="row"  spacing={2}>
                                        <Button
                                            variant="contained"
                                            color="warning"
                                            disabled={orderDetails.Dispatch.Status !== "PENDING"}
                                            component="label"
                                            onClick={async () => await handleDeliveredClick()}
                                        >
                                            <MobileFriendlyIcon />Delivered
                                        </Button>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>

            </Container>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    {/* Recent Orders */}
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <Title>Product list</Title>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Index</TableCell>
                                        <TableCell>Description</TableCell>
                                        <TableCell>Bar code</TableCell>
                                        <TableCell>Quantity</TableCell>
                                        <TableCell align="right">Sale Amount</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orderDetails.Dispatch.Products.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{index}</TableCell>
                                            <TableCell>{row.Description}</TableCell>
                                            <TableCell>{row.Barcode}</TableCell>
                                            <TableCell>{row.Quantity}</TableCell>
                                            <TableCell align="right">{`$${row.SaleAmount}`}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <DialogGenerateDispatchPdf open={open} setOpen={setOpen} orderDetails={orderDetails}/>
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