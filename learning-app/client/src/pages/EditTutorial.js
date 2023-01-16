import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import http from '../http';

function EditTutorial() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [tutorial, setTutorial] = useState({
        title: "",
        description: ""
    });

    useEffect(() => {
        http.get(`/tutorial/${id}`).then((res) => {
            console.log(res.data);
            setTutorial(res.data);
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
        </Container>
    )
}

export default EditTutorial