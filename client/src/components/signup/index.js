import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Formik } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';




function sendData(values, history) {

    axios.post('http://localhost:5000/user', values)

        .then(response => {
            console.log(response);
            if (response.status === 200) {
                console.log('data inserted');
                alert('successfully inserted');
                history("/signin");
            }
            else if (response.status === 400) {
                alert('Invalid details');
            }
        })
        .catch(error => {
            console.log(error)
        })

}


const theme = createTheme();

export default function SignUp() {

    let history = useNavigate();


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
                        Sign up
                    </Typography>

                    <Formik
                        initialValues={{
                            fullName: '',
                            email: '',
                            password: '',
                            phone: '',
                            plan:'Silver'
                        }}

                        validate={values => {

                            const errors = {};

                            // fullname validation
                            if (!values.fullName) {
                                errors.fullName = 'Enter your fullname';
                            } else if (values.fullName.length < 4 || values.fullName.length > 15) {
                                errors.fullName = 'fullName is too short or too long';
                            }



                            // email validation
                            if (!values.email) {
                                errors.email = 'Required';
                            } else if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                            ) {
                                errors.email = 'Invalid email address';
                            }

                            // password validation
                            if (!values.password) {
                                errors.password = 'enter password';
                            }
                            else if (!/^(?=.*\d)(?=.*[a-z]).{8,}$/.test(values.password)) {
                                errors.password = 'password must contain atleast one number and 8 characters';
                            }

                            // qualification validation
                            if (!values.phone) {
                                errors.phone = 'Enter your phone number';
                            } else if (values.phone.length < 10 || values.phone.length > 10) {
                                errors.phone = 'phone number is too short or too long';
                            }

                            return errors;
                        }}

                        onSubmit={(values, { setSubmitting }) => {
                            sendData(values, history);
                            console.log(values);
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,

                        }) => (

                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            autoComplete="given-name"
                                            name="fullName"
                                            required
                                            fullWidth
                                            id="name"
                                            label="Full Name"
                                            value={values.firstName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.firstName && errors.firstName}
                                            helperText={touched.firstName && errors.firstName}
                                            autoFocus
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            autoComplete="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.email && errors.email}
                                            helperText={touched.email && errors.email}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="new-password"
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.password && errors.password}
                                            helperText={touched.password && errors.password}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="phone"
                                            label="Phone Number"
                                            type="number"
                                            id="phone"
                                            value={values.phone}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.phone && errors.phone}
                                            helperText={touched.phone && errors.phone}
                                        />
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
                                        <Link to="/signin">
                                            {"Already have an account? Sign In"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        )}
                    </Formik>
                </Box>
            </Container>
        </ThemeProvider>
    );
}