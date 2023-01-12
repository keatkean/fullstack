import './App.css';
import { Box, Container, AppBar, Toolbar, Typography, Button } from '@mui/material';

function App() {
  return (
    <Box>
      <AppBar position="static" className='AppBar'>
        <Container>
          <Toolbar>
            <Typography variant="h6" sx={{ mr: 2 }}>
              Learning
            </Typography>
            <Button color="inherit">Tutorials</Button>
            <Button color="inherit">Add</Button>
            <Box sx={{ flexGrow: 1 }}>
            </Box>
            <Button color="inherit">Register</Button>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

export default App;
