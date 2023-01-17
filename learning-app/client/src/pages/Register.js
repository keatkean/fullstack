import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import { Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import http from '../http';

function Register() {
    const navigate = useNavigate();

    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        validationSchema: Yup.object().shape({
            name: Yup.string()
                .min(3, 'Name should be of minimum 3 characters length')
                .max(50, 'Name should be of maximum 50 characters length')
                .required('Name is required'),
            email: Yup.string()
                .email('Enter a valid email')
                .max(50, 'Email should be of maximum 50 characters length')
                .required('Email is required'),
            password: Yup.string()
                .min(8, 'Password should be of minimum 8 characters length')
                .max(50, 'Password should be of maximum 50 characters length')
                .required('Password is required'),
            confirmPassword: Yup.string()
                .required('Confirm password is required')
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
        }),
        onSubmit: (data) => {
            //console.log(data);
            http.post("/user/register", data)
                .then((res) => {
                    console.log(res.data);
                    navigate("/login");
                })
                .catch(function (error) {
                    console.log(error.response);
                    setMessage(error.response.data.message);
                    setOpen(true);
                });
        }
    });

    return (
        <Container>
            <Box sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
            >
                <Typography variant="h5" sx={{ my: 2 }}>
                    Register
                </Typography>
                <Box component="form" onSubmit={formik.handleSubmit}
                    sx={{ maxWidth: '500px' }}>
                    <TextField
                        fullWidth margin="normal" autoComplete="off"
                        name="name"
                        label="Name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                    <TextField
                        fullWidth margin="normal" autoComplete="off"
                        name="email"
                        label="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                        fullWidth margin="normal" autoComplete="off"
                        name="password"
                        type="password"
                        label="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    <TextField
                        fullWidth margin="normal" autoComplete="off"
                        name="confirmPassword"
                        type="password"
                        label="Confirm Password"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                    />
                    <Button fullWidth variant="contained" sx={{ mt: 2 }} type="submit">
                        Register
                    </Button>
                </Box>
            </Box>

            <Snackbar
                open={open}
                autoHideDuration={5000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert onClose={handleClose} variant='filled' severity="error" sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </Container>
    )
}

export default Register