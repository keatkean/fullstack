import React, { useState } from 'react';
import { Container, Box, Grid, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import http from '../http';

function AddTutorial() {
    const navigate = useNavigate();

    const [imageFile, setImageFile] = useState(null);

    const formik = useFormik({
        initialValues: {
            title: "",
            description: ""
        },
        validationSchema: Yup.object().shape({
            title: Yup.string()
                .max(100, 'Title should be of maximum 100 characters length')
                .required('Title is required'),
            description: Yup.string()
                .max(500, 'Description should be of maximum 500 characters length')
                .required('Description is required')
        }),
        onSubmit: (data) => {
            if (imageFile) {
                data.imageFile = imageFile;
            }
            console.log(data);
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

    const onFileChange = (e) => {
        let file = e.target.files[0];
        if (file) {
            console.log(file);
            let formData = new FormData();
            formData.append('file', file);
            http.post('/file/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then((res) => {
                    console.log(res.data);
                    setImageFile(res.data.filename);
                })
                .catch(function (error) {
                    console.log(error.response);
                });
        }
    };

    return (
        <Container>
            <Typography variant="h5" sx={{ my: 2 }}>
                Add Tutorial
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} lg={8}>
                        <TextField
                            fullWidth margin="normal" autoComplete="off"
                            name="title"
                            label="Title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            error={formik.touched.title && Boolean(formik.errors.title)}
                            helperText={formik.touched.title && formik.errors.title}
                        />
                        <TextField
                            fullWidth margin="normal" autoComplete="off"
                            multiline minRows={2}
                            name="description"
                            label="Description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <Button variant="contained" component="label">
                            Upload Image
                            <input hidden accept="image/*" multiple type="file" onChange={onFileChange} />
                        </Button>
                        {
                            imageFile && (
                                <Box sx={{ mt: 2 }}>
                                    <Box component="img"
                                        src={`${process.env.REACT_APP_FILE_BASE_URL}${imageFile}`}
                                        alt="tutorial"
                                        sx={{ maxWidth: '100%', maxHeight: '300px' }}>
                                    </Box>
                                </Box>
                            )
                        }
                    </Grid>
                </Grid>
                <Box sx={{ mt: 2 }}>
                    <Button variant="contained" type="submit">
                        Add
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

export default AddTutorial