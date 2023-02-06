import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Fragment, useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import RegisterUserHelper from "../hooks/userHooks";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import {AuthContext} from "../context/AuthContext";

const theme = createTheme();

export function SignIn() {
    const navigate = useNavigate();
    const { login, validateEmail, encryptPassword } = RegisterUserHelper
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [validEmail, setValidEmail] = useState(true);
    const { login: authLogin } = useContext( AuthContext );

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const password = encryptPassword(data.get('password'));
        const result = await login(email, password);
        if (result === "UNAUTHORIZED"){
            setErrorMessage('Email and password is not correct!');
            setShowErrorMessage(true);
        }
        if (result.Email){
            authLogin(result.Email);
            setShowErrorMessage(false);
            navigate("/main", {
                replace: true
            })
        }
    };
    const handleCloseAlertsErrorClick = (event, reason) => {
        setShowErrorMessage(false);
        if (reason === 'clickaway') {
            return;
        }

    };
    const handleSingUpClick = () => {
        navigate("/singup", {
            replace: false
        })
    };
    const handleEmailOnBlur = (event) => {
        const email = event.target.value;
        if (email !== undefined) {
            setValidEmail(validateEmail(email));
        }
        else {
            setValidEmail(false);
        }
    }

    return (
    <Fragment>
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            onBlur={handleEmailOnBlur}
                            helperText={!validEmail ? 'Email is not valid' : ''}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link onClick={handleSingUpClick} variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Snackbar open={showErrorMessage} autoHideDuration={6000} onClose={handleCloseAlertsErrorClick}>
                        <Alert onClose={handleCloseAlertsErrorClick} variant="filled" severity="error" >
                            {errorMessage}
                        </Alert>
                    </Snackbar>
                </Stack>
            </Container>
        </ThemeProvider>
    </Fragment>

    );
}