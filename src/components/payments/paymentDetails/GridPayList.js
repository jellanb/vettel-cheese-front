import {Fragment} from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Title from "../../../helpers/Title/Title";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import * as React from "react";
import moment from "moment/moment";


export default function GridPayList({orderDetails}) {
    function toDate(dateStr) {
        const dateString = moment(dateStr).format('YYYY-MM-DD');
        return dateString
    };

    return (
        <Fragment>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    {/* Recent Orders */}
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <Title>Paid list</Title>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Paid Date</TableCell>
                                        <TableCell>Receptor Name</TableCell>
                                        <TableCell>Different</TableCell>
                                        <TableCell>Paid Amount</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orderDetails.Payment.CreditPaid ? orderDetails.Payment.CreditPaid.map((row) => (
                                            <TableRow key={row.id}>
                                                <TableCell>{toDate(row.Date)}</TableCell>
                                                <TableCell>{row.ReceptorName}</TableCell>
                                                <TableCell>{`$${row.Different}`}</TableCell>
                                                <TableCell>{`$${row.Amount}`}</TableCell>
                                            </TableRow>
                                        ))
                                        : <Typography>nothing paid to show...</Typography>
                                    }
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Fragment>
    )
}