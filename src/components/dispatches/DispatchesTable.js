import {Fragment, useState} from "react";
import * as React from "react";
import Title from "../../helpers/Title/Title";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FindInPageIcon from '@mui/icons-material/FindInPage';
import Button from "@mui/material/Button";
import {DeliveryStatus} from "./DeliveryStatus";
import {DialogAddDispatchItem} from "./DialogAddDispatchItem";
import Typography from "@mui/material/Typography";
import moment from "moment";
import {DialogEditDispatchItem} from "./DialogEditDispatchItem";
import DialogDeleteDispatchItem from "./DialogDeleteDispatchItem";

const DispatchDummy = {
    ReasonSocial: '',
    DeliveryDate: '',
    DeliveryName: ''
}

const PaymentDummy = {
    PaymentDate: ''
}

export function DispatchesTable({setContent, setOrderDetails, productsGridData, loadPage, setLoadPage, orderList}) {
    const [openDialogEditProduct, setOpenDialogEditProduct] = useState(false);
    const [openDialogDeleteProductDialog, setOpenDialogDeleteProductDialog] = useState(false);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [order, setOrder] = useState({
        Dispatch: DispatchDummy,
        Payment: PaymentDummy
    });

    const handleGridDeleteItem = (item) =>{
        setOpenDialogDeleteProductDialog(true);
        setOrder(item);
    };
    const handleGridEditItem = (item) =>{
        setOpenDialogEditProduct(true);
        setOrder(item);
    };
    const handleAddButtonClick = () => {
        setOpenAddDialog(true);
    }
    const handleDetailsButtonClick = (item) =>{
        setOrderDetails(item);
        setContent('DispatchDetails');
    }

    function toDate(dateStr) {
        const dateString = moment(dateStr).format('YYYY-MM-DD');
        return dateString
    };

    function toCreditDays(deliveryDate, paymentDate) {
        const deliveryDays = moment(deliveryDate).date()
        const paymentDays = moment(paymentDate).date()
        return paymentDays - deliveryDays
    }

    return (
        <Fragment>
                <Title>Dispatches</Title>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Order Number</TableCell>
                            <TableCell>Create Date</TableCell>
                            <TableCell>Social Reason</TableCell>
                            <TableCell>Delivery Date</TableCell>
                            <TableCell>Payment Date</TableCell>
                            <TableCell>Credit days</TableCell>
                            <TableCell>Delivery state</TableCell>
                            <TableCell align="right">Amount</TableCell>
                            <TableCell>Delivery name</TableCell>
                            <TableCell align="left">Edit</TableCell>
                            <TableCell align="left">Delete</TableCell>
                            <TableCell align="left">Details</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orderList ? orderList.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.OrderNumber}</TableCell>
                                <TableCell>{toDate(row.Dispatch.CreatedDate)}</TableCell>
                                <TableCell>{row.Dispatch.ReasonSocial}</TableCell>
                                <TableCell>{toDate(row.Dispatch.DeliveryDate)}</TableCell>
                                <TableCell>{toDate(row.Payment.PaymentDate)}</TableCell>
                                <TableCell>{toCreditDays(row.Dispatch.DeliveryDate, row.Payment.PaymentDate)}</TableCell>
                                <TableCell>
                                    <DeliveryStatus status={row.Dispatch.Status} deliveryDate={row.Dispatch.DeliveryDate} />
                                </TableCell>
                                <TableCell>{row.Payment.Amount}</TableCell>
                                <TableCell>{row.Dispatch.DeliveryName}</TableCell>
                                <TableCell align="right" onClick={() => handleGridEditItem(row)}>
                                    <Stack direction="row"  spacing={2}>
                                        <IconButton color="info" aria-label="edit">
                                            <EditIcon />
                                        </IconButton>
                                    </Stack>
                                </TableCell>
                                <TableCell align="right" onClick={() => handleGridDeleteItem(row)}>
                                    <Stack direction="row"  spacing={2}>
                                        <IconButton color="error" aria-label="delete">
                                            <DeleteIcon />
                                        </IconButton>
                                    </Stack>
                                </TableCell>
                                <TableCell align="right" onClick={() => handleDetailsButtonClick(row)}>
                                    <Stack direction="row"  spacing={2}>
                                        <IconButton color="success" aria-label="details">
                                            <FindInPageIcon />
                                        </IconButton>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        )): <Typography>nothing dispatches item to show...</Typography>}
                    </TableBody>
                </Table>
                <br/>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Button variant="contained" onClick={handleAddButtonClick} component="label">
                        Add
                    </Button>
                </Stack>
                <DialogEditDispatchItem order={order} setOrder={setOrder} openDialog={openDialogEditProduct} setOpenDialog={setOpenDialogEditProduct} loadPage={loadPage} setLoadPage={setLoadPage}/>
                <DialogDeleteDispatchItem order={order} setOrder={setOrder} openDialog={openDialogDeleteProductDialog} setOpenDialog={setOpenDialogDeleteProductDialog} loadPage={loadPage} setLoadPage={setLoadPage}/>
                <DialogAddDispatchItem open={openAddDialog} setOpen={setOpenAddDialog} productsGridData={productsGridData} loadPage={loadPage} setLoadPage={setLoadPage}/>
        </Fragment>
    )
}