import {Fragment} from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import {ProductsTable} from "./ProductsTable";

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

export function ProductsSection({productsGridData, loadPage, setLoadPage}) {

    return(
        <Fragment>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    {/* Recent Orders */}
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <ProductsTable productsGridData={productsGridData} loadPage={loadPage} setLoadPage={setLoadPage}/>
                        </Paper>
                    </Grid>
                </Grid>
                <Copyright sx={{ pt: 4 }} />
            </Container>
        </Fragment>
    )
}