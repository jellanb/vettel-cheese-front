import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import * as React from "react";
import {Fragment} from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {DispatchesTable} from "./DispatchesTable";


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export function DispatchesSection({setContent, setOrderDetails, productsGridData, loadPage, setLoadPage, orderList}) {
    return (
        <Fragment>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    {/* Recent Orders */}
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <DispatchesTable
                                setContent={setContent}
                                setOrderDetails={setOrderDetails}
                                productsGridData={productsGridData}
                                loadPage={loadPage}
                                setLoadPage={setLoadPage}
                                orderList={orderList}
                            />
                        </Paper>
                    </Grid>
                </Grid>
                <Copyright sx={{ pt: 4 }} />
            </Container>
        </Fragment>
    )
}