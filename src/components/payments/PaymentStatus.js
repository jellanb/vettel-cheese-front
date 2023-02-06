import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import * as React from "react";
import moment from "moment";


export function PaymentStatus({status, paymentDate}) {

    function toDate(date) {
        const dateString = moment(date).format('YYYY-MM-DD');
        return dateString;
    };

    const date = moment().format('YYYY-MM-DD');
    if (toDate(paymentDate) < date && status !== "PAID") status = "LASTED";
    switch (status) {
        case 'PAID':
            return (
                <Stack spacing={1} alignItems="center">
                    <Stack direction="row" spacing={1}>
                        <Chip label={status} color="default"></Chip>
                    </Stack>
                </Stack>
            )
            // eslint-disable-next-line
            break;
        case 'PENDING':
            return (
                <Stack spacing={1} alignItems="center">
                    <Stack direction="row" spacing={1}>
                        <Chip label={status} color="success"></Chip>
                    </Stack>
                </Stack>
            )
            // eslint-disable-next-line
            break;
        case 'LASTED':
            return (
                <Stack spacing={1} alignItems="center">
                    <Stack direction="row" spacing={1}>
                        <Chip label={status} color="error"></Chip>
                    </Stack>
                </Stack>
            )
            // eslint-disable-next-line
            break;
        default:
            return (
                <Stack spacing={1} alignItems="center">
                    <Stack direction="row" spacing={1}>
                        <Chip label={status} color="success"></Chip>
                    </Stack>
                </Stack>
            )
    }
}