import React, { useEffect, useState } from 'react'
import http from '../http';
import { Typography, Grid, Card, CardContent, Box } from '@mui/material';

function Tutorials() {
    const [tutorialList, setTutorialList] = useState([]);

    useEffect(() => {
        http.get('/tutorial').then((res) => {
            console.log(res.data);
            setTutorialList(res.data);
        });
    }, []);

    return (
        <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
                Tutorials
            </Typography>

            <Grid container spacing={2}>
                {
                    tutorialList && tutorialList.map((tutorial, i) => {
                        return (
                            <Grid item xs={12} md={6} lg={4} key={tutorial.id}>
                                <Card >
                                    <CardContent>
                                        <Typography variant="h6">
                                            {tutorial.title}
                                        </Typography>
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
        </Box>
    )
}

export default Tutorials