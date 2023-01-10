//import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home'
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/">Home</Link>
        <Link to="/createPost">Create Post</Link>
        {!localStorage.getItem("accessToken") && (
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
    </div>
  );
}

export default App;
