import {Fragment, useState} from "react";
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
import Stack from "@mui/material/Stack";
import UploadFileIcon from '@mui/icons-material/UploadFile';


export function DialogAddTicket({open, setOpen, orderDetails, setOrderDetails}) {
    const [folio, setFolio] = useState();
    const [amount, setAmount] = useState();
    const [reasonSocial, setReasonSocial] = useState();


    const handleClose = () => {
        setOpen(false);
    };
    const handleSaveClick = () => {

    };
    const handleFolioChange = (event) => {
        setFolio(event.target.value);
    };
    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };
    const handleReasonSocialChange = (event) => {
        setReasonSocial(event.target.value);
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
                    {"Add ticket fields"}
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
                                            name="Folio"
                                            label="Folio"
                                            id="Folio"
                                            autoFocus
                                            value={folio}
                                            onChange={handleFolioChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="Amount"
                                            label="Amount"
                                            id="Amount"
                                            autoFocus
                                            value={amount}
                                            onChange={handleAmountChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="ReasonSocial"
                                            label="Reason Social"
                                            id="ReasonSocial"
                                            autoFocus
                                            value={reasonSocial}
                                            onChange={handleReasonSocialChange}
                                        />
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
        </Fragment>
    )
}