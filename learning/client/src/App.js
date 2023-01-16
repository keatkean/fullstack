import './App.css';
import { Container, AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Tutorials from './pages/Tutorials';

function App() {
  return (
    <div>
      <Router>
        <AppBar position="static" className='AppBar'>
          <Container>
            <Toolbar disableGutters={true}>
              <Link to="/">
                <Typography variant="h6">
                  Learning
                </Typography>
              </Link>
              <Link to="/tutorials" >Tutorials</Link>
              <Box sx={{ flexGrow: 1 }}>
              </Box>
              <Button color="inherit">Register</Button>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </Container>
        </AppBar>

        <Routes>
          <Route path={"/"} element={<Tutorials />} />
          <Route path={"/tutorials"} element={<Tutorials />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
