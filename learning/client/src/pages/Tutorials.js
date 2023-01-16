import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Typography, Button, Grid, Card, CardContent, Box, IconButton } from '@mui/material';
import { AccessTime, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import http from '../http';

function Tutorials() {
    const [tutorialList, setTutorialList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        http.get("/tutorial/").then((res) => {
            //console.log(res.data);
            setTutorialList(res.data);
        });
    }, []);

    return (
        <Container>
            <Box sx={{ display: 'flex', my: 2 }}>
                <Typography variant="h5" sx={{ flexGrow: 1 }}>
                    Tutorials
                </Typography>
                <Button variant='contained'
                    onClick={() => { navigate('/addtutorial') }}>
                    Add Tutorial
                </Button>
            </Box>

            <Grid container spacing={2}>
                {
                    tutorialList.map((tutorial, i) => {
                        return (
                            <Grid item xs={12} md={6} lg={4} key={tutorial.id}>
                                <Card >
                                    <CardContent>
                                        <Box sx={{ display: 'flex', mb: 1 }}>
                                            <Typography variant="h5"
                                                sx={{ flexGrow: 1 }}>
                                                {tutorial.title}
                                            </Typography>
                                            <IconButton color="primary"
                                                onClick={() => { navigate(`/edittutorial/${tutorial.id}`) }} >
                                                <Edit />
                                            </IconButton>
                                        </Box>
                                        <Box color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                            <AccessTime sx={{ mr: 1 }} />
                                            <Typography>
                                                {moment(tutorial.createdAt).format(process.env.REACT_APP_DATETIME_FORMAT)}
                                            </Typography>
                                        </Box>
                                        <Typography>
                                            {tutorial.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })
                }
            </Grid>
        </Container>
    )
}

export default Tutorials