import React, { useState, useEffect } from 'react';
import { Container, Box, Grid, Typography, TextField, Button } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import http from '../http';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditTutorial() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [tutorial, setTutorial] = useState({
        title: "",
        description: ""
    });
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        http.get(`/tutorial/${id}`).then((res) => {
            console.log(res.data);
            setTutorial(res.data);
            setImageFile(res.data.imageFile);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const formik = useFormik({
        initialValues: tutorial,
        enableReinitialize: true,
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
            http.put(`/tutorial/${id}`, data)
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
            if (file.size > 1024 * 1024) {
                toast.error('Maximum file size is 1MB', {
                    position: toast.POSITION.TOP_RIGHT
                });
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
                    console.log(res.data);
                    setImageFile(res.data.filename);
                })
                .catch(function (error) {
                    console.log(error.response);
                });
        }
    };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteTutorial = () => {
        setOpen(false);
        http.delete(`/tutorial/${id}`)
            .then((res) => {
                console.log(res.data);
                navigate("/tutorials");
            })
            .catch(function (error) {
                console.log(error.response);
            });
    }

    return (
        <Container>
            <Typography variant="h5" sx={{ my: 2 }}>
                Edit Tutorial
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
                        <Button variant="contained" component="label" sx={{ mt: 2 }}>
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
                        Update
                    </Button>
                    <Button variant="contained" sx={{ ml: 2 }} color="error" onClick={handleClickOpen}>
                        Delete
                    </Button>
                </Box>
            </Box>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    Delete Tutorial
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this tutorial?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="contained" color="inherit">
                        Cancel
                    </Button>
                    <Button onClick={deleteTutorial} variant="contained" color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            <ToastContainer />
        </Container>
    )
}

export default EditTutorial