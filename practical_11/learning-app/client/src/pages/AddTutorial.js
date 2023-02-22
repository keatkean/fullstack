import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Grid } from '@mui/material';
import AspectRatio from '@mui/joy/AspectRatio';
import { useFormik } from 'formik';
import * as yup from 'yup';
import http from '../http';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddTutorial() {
    const navigate = useNavigate();
    const [imageFile, setImageFile] = useState(null);

    const formik = useFormik({
        initialValues: {
            title: "",
            description: ""
        },
        validationSchema: yup.object().shape({
            title: yup.string()
                .max(100, 'Title must be at most 100 characters')
                .required('Title is required'),
            description: yup.string()
                .max(500, 'Description must be at most 500 characters')
                .required('Description is required')
        }),
        onSubmit: (data) => {
            if (imageFile) {
                data.imageFile = imageFile;
            }
            http.post("/tutorial", data)
                .then((res) => {
                    console.log(res.data);
                    navigate("/tutorials");
                });
        }
    });

    const onFileChange = (e) => {
        let file = e.target.files[0];
        if (file) {
            if (file.size > 1024 * 1024) {
                toast.error('Maximum file size is 1MB');
                return;
            }

            let formData = new FormData();
            formData.append('file', file);
            http.post('/file/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then((res) => {
                    setImageFile(res.data.filename);
                })
                .catch(function (error) {
                    console.log(error.response);
                });
        }
    };

    return (
        <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
                Add Tutorial
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} lg={8}>
                        <TextField
                            fullWidth margin="normal" autoComplete="off"
                            label="Title"
                            name="title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            error={formik.touched.title && Boolean(formik.errors.title)}
                            helperText={formik.touched.title && formik.errors.title}
                        />
                        <TextField
                            fullWidth margin="normal" autoComplete="off"
                            multiline minRows={2}
                            label="Description"
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <Box sx={{ textAlign: 'center', mt: 2 }} >
                            <Button variant="contained" component="label">
                                Upload Image
                                <input hidden accept="image/*" multiple type="file"
                                    onChange={onFileChange} />
                            </Button>
                            {
                                imageFile && (
                                    <AspectRatio sx={{ mt: 2 }}>
                                        <Box component="img" alt="tutorial"
                                            src={`${process.env.REACT_APP_FILE_BASE_URL}${imageFile}`}>
                                        </Box>
                                    </AspectRatio>
                                )
                            }
                        </Box>
                    </Grid>
                </Grid>
                <Box sx={{ mt: 2 }}>
                    <Button variant="contained" type="submit">
                        Add
                    </Button>
                </Box>
            </Box>

            <ToastContainer />
        </Box>
    );
}

export default AddTutorial;