import React from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import http from '../http';

function Register() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            username: ""
        },
        validationSchema: Yup.object().shape({
            email: Yup.string()
                .email('Enter a valid email')
                .max(50, 'Email should be of maximum 50 characters length')
                .required('Email is required'),
            password: Yup.string()
                .min(8, 'Password should be of minimum 8 characters length')
                .max(50, 'Password should be of maximum 50 characters length')
                .required('Password is required'),
            username: Yup.string()
                .min(3, 'Name should be of minimum 3 characters length')
                .max(50, 'Name should be of maximum 50 characters length')
                .required('Name is required')
        }),
        onSubmit: (data) => {
            http.post("/user/register", data)
                .then((res) => {
                    console.log(res.data);
                    navigate("/login");
                })
                .catch(function (error) {
                    console.log(error.response);
                });
        }
    });

    return (
        <Container>
            <Typography variant="h5" sx={{ my: 2 }}>
                Register
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth sx={{ mb: 2 }}
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    fullWidth sx={{ mb: 2 }}
                    name="password"
                    type="password"
                    label="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                <TextField
                    fullWidth sx={{ mb: 2 }}
                    name="username"
                    label="Name"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                />
                <Button variant="contained" type="submit">
                    Register
                </Button>
            </form>
        </Container>
    )
}

export default Register