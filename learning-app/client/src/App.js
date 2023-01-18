import './App.css';
import { Container, AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Tutorials from './pages/Tutorials';
import AddTutorial from './pages/AddTutorial';
import EditTutorial from './pages/EditTutorial';
import Register from './pages/Register';
import Login from './pages/Login';
import { useState, useEffect } from 'react';
import UserContext from './contexts/UserContext';
import http from './http';
import AuthGuard from './utils/AuthGuard';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      http.get('/user/auth').then((res) => {
        //console.log(res.data);
        setUser(res.data);
      });
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    setUser(null);
    window.location.replace("/");
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <AppBar position="static" className='AppBar'>
          <Container>
            <Toolbar disableGutters={true}>
              <Link to="/">
                <Typography variant="h6" component="div">
                  Learning
                </Typography>
              </Link>
              <Link to="/tutorials" ><Typography>Tutorials</Typography></Link>
              <Box sx={{ flexGrow: 1 }}>
              </Box>
              {user && (
                <>
                  <Typography>{user.name}</Typography>
                  <Button onClick={logout}>Logout</Button>
                </>
              )
              }
              {!user && (
                <>
                  <Link to="/register" ><Typography>Register</Typography></Link>
                  <Link to="/login" ><Typography>Login</Typography></Link>
                </>
              )}
            </Toolbar>
          </Container>
        </AppBar>

        <Routes>
          <Route path={"/"} element={<Tutorials />} />
          <Route path={"/tutorials"} element={<Tutorials />} />
          <Route path={"/addtutorial"} element={<AuthGuard><AddTutorial /></AuthGuard>} />
          <Route path={"/edittutorial/:id"} element={<AuthGuard><EditTutorial /></AuthGuard>} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/login"} element={<Login />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
