import {Fragment} from "react";
import Title from "../../helpers/Title/Title";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import * as React from "react";
import {PaymentStatus} from "./PaymentStatus";
import Typography from "@mui/material/Typography";
import moment from "moment/moment";

export function PaymentsTable({setPaymentDetails, setContent, orderList}) {
    const handleDetailsButtonClick = (item) =>{
        setPaymentDetails(item);
        setContent('PaymentDetails');
    };
    function toDate(dateStr) {
        const dateString = moment(dateStr).format('YYYY-MM-DD');
        return dateString
    };

    return(
        <Fragment>
            <Title>Payments</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Order Number</TableCell>
                        <TableCell>Dispatch Date</TableCell>
                        <TableCell>Payment Date</TableCell>
                        <TableCell>Credit time</TableCell>
                        <TableCell>Credit consume</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="right">Amount</TableCell>
                        <TableCell align="left">Paid Amount</TableCell>
                        <TableCell>Social Reason</TableCell>
                        <TableCell align="left">Details</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orderList ? orderList.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell>{row.OrderNumber}</TableCell>
                            <TableCell>{toDate(row.Dispatch.DeliveryDate)}</TableCell>
                            <TableCell>{toDate(row.Payment.PaymentDate)}</TableCell>
                            <TableCell>{toDate(row.Payment.CreditTime)}</TableCell>
                            <TableCell>{toDate(row.Payment.CreditTime)}</TableCell>
                            <TableCell>
                                <PaymentStatus status={row.Payment.Status} paymentDate={row.Payment.PaymentDate} />
                            </TableCell>
                            <TableCell>{row.Payment.Amount}</TableCell>
                            <TableCell>{row.Payment.SummaryPaidAmount}</TableCell>
                            <TableCell>{row.Payment.ReasonSocial}</TableCell>
                            <TableCell align="right" onClick={() => handleDetailsButtonClick(row)}>
                                <Stack direction="row"  spacing={2}>
                                    <IconButton color="success" aria-label="delete">
                                        <FindInPageIcon />
                                    </IconButton>
                                </Stack>
                            </TableCell>
                        </TableRow>
                    ))
                    : <Typography>nothing payment to show...</Typography>}
                </TableBody>
            </Table>
        </Fragment>
    )
}