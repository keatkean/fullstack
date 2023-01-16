import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Typography, Button, Grid, Card, CardContent, Box, IconButton } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
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
                <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
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
                                        <Box sx={{ display: 'flex' }}>
                                            <Typography gutterBottom variant="h5" component="div"
                                                sx={{ flexGrow: 1 }}>
                                                {tutorial.title}
                                            </Typography>
                                            <IconButton color="primary"
                                                onClick={() => { navigate(`/edittutorial/${tutorial.id}`) }} >
                                                <Edit />
                                            </IconButton>
                                        </Box>
                                        <Typography variant="body2" color="text.secondary">
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