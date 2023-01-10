//import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home'
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Register from './pages/Register';
import Login from './pages/Login';
import { AuthContext } from './helpers/AuthContext';
import { useState, useEffect } from 'react';

function App() {
  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    console.log("App use effect...");
    if (localStorage.getItem("accessToken")) {
      setAuthState(true);
    }
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <Link to="/">Home</Link>
          <Link to="/createPost">Create Post</Link>
          {!authState && (
            <>
              <Link to="register">Register</Link>
              <Link to="login">Login</Link>
            </>
          )}
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/register" exact element={<Register />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/createPost" exact element={<CreatePost />} />
            <Route path="/post/:id" exact element={<Post />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
