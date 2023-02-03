import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, TextField, Button } from '@mui/material';
import http from '../http';

function EditTutorial() {
    const { id } = useParams();

    const [tutorial, setTutorial] = useState({
        title: "",
        description: ""
    });

    useEffect(() => {
        http.get(`/tutorial/${id}`).then((res) => {
            setTutorial(res.data);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
                Edit Tutorial
            </Typography>
            <Box component="form">
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="Title"
                    name="title"
                />
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    multiline minRows={2}
                    label="Description"
                    name="description"
                />
                <Box sx={{ mt: 2 }}>
                    <Button variant="contained" type="submit">
                        Update
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default EditTutorial;