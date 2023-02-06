import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useNavigate} from "react-router-dom";
import RegisterUserHelper from "../hooks/userHooks";
import {useState} from "react";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';

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

const theme = createTheme();

export function SignUp() {
    const [rol, setRol] = React.useState('');
    const { PasswordValidate, encryptPassword, CreateUser } = RegisterUserHelper;
    const [password, setPassword] = useState();
    const [passwordValid, setPasswordValid] = useState(true);
    const navigate = useNavigate();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const username = data.get('name');
        const email = data.get('email');
        console.log(username, email);
        const result = await CreateUser(username, password, email, rol);
        console.log(result);
        if (result.Email) {
            setShowErrorMessage(false);
            setShowSuccessMessage(true);
            setTimeout(() => navigate("/singin"), 2000);
        } else {
            setShowErrorMessage(true);
            setErrorMessage(result.Msg)
        }
    };
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

    const handlerPasswordChange = (event) => {
        event.preventDefault();
        setPassword(encryptPassword(event.target.value))
    }

    const handlerPasswordValidatedChange = (event) => {
        event.preventDefault();
        setPasswordValid(PasswordValidate(password, encryptPassword(event.target.value)));
        PasswordValidate(password, encryptPassword(event.target.value));
    }

    const handlerClickGoSingIn = () => {
        navigate("/singin")
    }

    const handleSelectChange = (event) =>{
        setRol(event.target.value)
    }

    return (
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
                        User Register
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onBlur={handlerPasswordChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="passwordValidation"
                                    label="Comprobar password"
                                    type="password"
                                    id="passwordValidation"
                                    autoComplete="new-password"
                                    onBlur={handlerPasswordValidatedChange}
                                    helperText={!passwordValid ? 'Password not coincide': ''}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Rol</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="rolSelector"
                                            value={rol}
                                            label="Rol"
                                            onChange={handleSelectChange}
                                        >
                                            <MenuItem value={2}>Colaborador</MenuItem>
                                            <MenuItem value={1}>Administrador</MenuItem>
                                        </Select>
                                    </FormControl>

                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link onClick={handlerClickGoSingIn} variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Snackbar open={showErrorMessage} autoHideDuration={6000} onClose={handleCloseAlertsSuccessClick}>
                        <Alert onClose={handleCloseAlertsErrorClick} variant="filled" severity="error" >
                            {errorMessage}
                        </Alert>
                    </Snackbar>
                    <Snackbar open={showSuccessMessage} autoHideDuration={6000} onClose={handleCloseAlertsErrorClick}>
                        <Alert onClose={handleCloseAlertsSuccessClick} variant="filled" severity="success">
                            User created successfully!
                        </Alert>
                    </Snackbar>
                </Stack>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}