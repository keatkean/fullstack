import React, { useState, useEffect, useContext } from 'react';
import { Container, Typography, Button, Grid, Card, CardContent, Box, IconButton, Input } from '@mui/material';
import { AccessTime, AccountCircle, Edit, Search, Clear } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import http from '../http';
import UserContext from '../contexts/UserContext';

function Tutorials() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const [tutorialList, setTutorialList] = useState([]);
    const [search, setSearch] = useState('');

    const getTutorials = () => {
        http.get('/tutorial').then((res) => {
            console.log(res.data);
            setTutorialList(res.data);
        });
    };

    const searchTutorials = () => {
        http.get(`/tutorial?search=${search}`).then((res) => {
            console.log(res.data);
            setTutorialList(res.data);
        });
    };

    useEffect(() => {
        getTutorials();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const onSearchKeyDown = (e) => {
        if (e.keyCode === 13) {
            searchTutorials();
        }
    };

    const onClearSearch = () => {
        setSearch('');
        getTutorials();
    };

    return (
        <Container>
            <Typography variant="h5" sx={{ my: 2 }}>
                Tutorials
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Input value={search} placeholder="Search by title"
                    onChange={onSearchChange} onKeyDown={onSearchKeyDown} />
                <IconButton onClick={searchTutorials} color="primary">
                    <Search />
                </IconButton>
                <IconButton onClick={onClearSearch} color="primary">
                    <Clear />
                </IconButton>
                <Box sx={{ flexGrow: 1 }} />
                {
                    user && (
                        <Button variant='contained'
                            onClick={() => { navigate('/addtutorial') }}>
                            Add
                        </Button>
                    )
                }
            </Box>

            <Grid container spacing={2}>
                {
                    tutorialList && tutorialList.map((tutorial, i) => {
                        return (
                            <Grid item xs={12} md={6} lg={4} key={tutorial.id}>
                                <Card >
                                    <CardContent>
                                        <Box sx={{ display: 'flex', mb: 1 }}>
                                            <Typography variant="h6"
                                                sx={{ flexGrow: 1 }}>
                                                {tutorial.title}
                                            </Typography>
                                            {
                                                user && user.id === tutorial.userId && (
                                                    <IconButton color="primary" sx={{ padding: '4px' }}
                                                        onClick={() => { navigate(`/edittutorial/${tutorial.id}`) }} >
                                                        <Edit />
                                                    </IconButton>
                                                )
                                            }
                                        </Box>
                                        <Box color="text.secondary" >
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                <AccountCircle sx={{ mr: 1 }} />
                                                <Typography>
                                                    {tutorial.user.name}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                <AccessTime sx={{ mr: 1 }} />
                                                <Typography>
                                                    {moment(tutorial.createdAt).format(process.env.REACT_APP_DATETIME_FORMAT)}
                                                </Typography>
                                            </Box>
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