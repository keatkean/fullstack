import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardContent, Input, IconButton, Button } from '@mui/material';
import { AccessTime, Search, Clear } from '@mui/icons-material';
import http from '../http';
import moment from 'moment';

function Tutorials() {
    const [tutorialList, setTutorialList] = useState([]);
    const [search, setSearch] = useState('');

    const onSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const getTutorials = () => {
        http.get('/tutorial').then((res) => {
            setTutorialList(res.data);
        });
    };

    const searchTutorials = () => {
        http.get(`/tutorial?search=${search}`).then((res) => {
            setTutorialList(res.data);
        });
    };

    useEffect(() => {
        getTutorials();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSearchKeyDown = (e) => {
        if (e.keyCode === 13) {
            searchTutorials();
        }
    };

    const onClickSearch = () => {
        searchTutorials();
    }

    const onClickClear = () => {
        setSearch('');
        getTutorials();
    };

    return (
        <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
                Tutorials
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Input value={search} placeholder="Search"
                    onChange={onSearchChange}
                    onKeyDown={onSearchKeyDown} />
                <IconButton color="primary"
                    onClick={onClickSearch}>
                    <Search />
                </IconButton>
                <IconButton color="primary"
                    onClick={onClickClear}>
                    <Clear />
                </IconButton>
                <Box sx={{ flexGrow: 1 }} />
                <Link to="/addtutorial" style={{ textDecoration: 'none' }}>
                    <Button variant='contained'>
                        Add
                    </Button>
                </Link>
            </Box>

            <Grid container spacing={2}>
                {
                    tutorialList.map((tutorial, i) => {
                        return (
                            <Grid item xs={12} md={6} lg={4} key={tutorial.id}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6" sx={{ mb: 1 }}>
                                            {tutorial.title}
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                                            color="text.secondary">
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
        </Box>
    );
}

export default Tutorials;