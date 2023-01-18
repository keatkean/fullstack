import React, { useContext } from 'react';
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import http from '../http';
import UserContext from '../contexts/UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object().shape({
            email: Yup.string()
                .email('Enter a valid email')
                .max(50, 'Email should be of maximum 50 characters length')
                .required('Email is required'),
            password: Yup.string()
                .min(8, 'Password should be of minimum 8 characters length')
                .max(50, 'Password should be of maximum 50 characters length')
                .required('Password is required')
        }),
        onSubmit: (data) => {
            http.post("/user/login", data)
                .then((res) => {
                    console.log(res.data);
                    localStorage.setItem("accessToken", res.data.accessToken);
                    setUser(res.data.user);
                    navigate("/");
                })
                .catch(function (error) {
                    console.log(error.response);
                    toast.error(`${error.response.data.message}`, {
                        position: toast.POSITION.TOP_RIGHT
                    });
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
                    Login
                </Typography>
                <Box component="form" onSubmit={formik.handleSubmit}
                    sx={{ maxWidth: '500px' }}>
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
                    <Button fullWidth variant="contained" sx={{ mt: 2 }} type="submit">
                        Login
                    </Button>
                </Box>
            </Box>

            <ToastContainer />
        </Container>
    )
}

export default Login