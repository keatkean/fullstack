import './App.css';
import { Container, AppBar, Toolbar, Typography, Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Tutorials from './pages/Tutorials';
import AddTutorial from './pages/AddTutorial';
import EditTutorial from './pages/EditTutorial';

function App() {
  return (
    <Router>
      <AppBar position="static" className="AppBar">
        <Container>
          <Toolbar disableGutters={true}>
            <Link to="/">
              <Typography variant="h6" component="div">
                Learning
              </Typography>
            </Link>
            <Link to="/tutorials" ><Typography>Tutorials</Typography></Link>
            <Box sx={{ flexGrow: 1 }}></Box>
            <Link to="/register" ><Typography>Register</Typography></Link>
            <Link to="/login" ><Typography>Login</Typography></Link>
          </Toolbar>
        </Container>
      </AppBar>

      <Container>
        <Routes>
          <Route path={"/"} element={<Tutorials />} />
          <Route path={"/tutorials"} element={<Tutorials />} />
          <Route path={"/addtutorial"} element={<AddTutorial />} />
          <Route path={"/edittutorial/:id"} element={<EditTutorial />} />
          <Route path={"/register"} />
          <Route path={"/login"} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
