import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import http from '../http';

function Register() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        validationSchema: yup.object().shape({
            name: yup.string()
                .min(3, 'Name must be at least 3 characters')
                .max(50, 'Name must be at most 50 characters')
                .required('Name is required'),
            email: yup.string()
                .email('Enter a valid email')
                .max(50, 'Email must be at most 50 characters')
                .required('Email is required'),
            password: yup.string()
                .min(8, 'Password must be at least 8 characters')
                .max(50, 'Password must be at most 50 characters')
                .required('Password is required'),
            confirmPassword: yup.string()
                .required('Confirm password is required')
                .oneOf([yup.ref('password'), null], 'Passwords must match')
        }),
        onSubmit: (data) => {
            http.post("/user/register", data)
                .then((res) => {
                    console.log(res.data);
                    navigate("/login");
                })
                .catch(function (err) {
                    console.log(err.response);
                });
        }
    });

    return (
        <Box sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Typography variant="h5" sx={{ my: 2 }}>
                Register
            </Typography>
            <Box component="form" sx={{ maxWidth: '500px' }}>
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="Name"
                    name="name"
                />
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="Email"
                    name="email"
                />
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="Password"
                    name="password" type="password"
                />
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="Confirm Password"
                    name="confirmPassword" type="password"
                />
                <Button fullWidth variant="contained" sx={{ mt: 2 }}
                    type="submit">
                    Register
                </Button>
            </Box>
        </Box>
    );
}

export default Register;