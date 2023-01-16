import React from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import http from '../http';

function AddTutorial() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            title: "",
            description: ""
        },
        validationSchema: Yup.object().shape({
            title: Yup.string().
                max(100, 'Title should be of maximum 100 characters length').
                required('Title is required'),
            description: Yup.string().
                max(500, 'Description should be of maximum 500 characters length').
                required('Description is required')
        }),
        onSubmit: (data) => {
            http.post("/tutorial", data)
                .then((res) => {
                    console.log(res.data);
                    navigate("/tutorials");
                })
                .catch(function (error) {
                    console.log(error.response);
                });
        }
    });

    return (
        <Container>
            <Typography variant="h5" sx={{ my: 2 }}>
                Add Tutorial
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth sx={{ mb: 2 }}
                    name="title"
                    label="Title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                />
                <TextField
                    fullWidth sx={{ mb: 2 }}
                    multiline minRows={2}
                    name="description"
                    label="Description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                />
                <Button variant="contained" type="submit">
                    Submit
                </Button>
            </form>
        </Container>
    )
}

export default AddTutorial