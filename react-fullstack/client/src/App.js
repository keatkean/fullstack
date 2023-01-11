//import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home'
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Register from './pages/Register';
import Login from './pages/Login';
import { useState, useEffect } from 'react';
import UserContext from './contexts/UserContext';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      axios.get('/user/auth').then((res) => {
        //console.log(res.data);
        setUser(res.data);
      });
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <Router>
          <Link to="/">Home</Link>
          {user && (
            <>
              <Link to="/createPost">Create Post</Link>
              <label>{user.username}</label>
              <button onClick={logout}>Logout</button>
            </>
          )}
          {!user && (
            <>
              <Link to="register">Register</Link>
              <Link to="login">Login</Link>
            </>
          )}
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/register" exact element={<Register />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/post/:id" exact element={<Post />} />
            {user && (
              <>
                <Route path="/createPost" exact element={<CreatePost />} />
              </>
            )}
          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
