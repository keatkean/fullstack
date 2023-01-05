//import logo from './logo.svg';
//import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/post/list").then((res) => {
      //console.log(res.data);
      setPostList(res.data);
    })
  }, []);

  return (
    <div className="App">
      {
        postList.map((post, i) => {
          return <div key={post.id}>
            <div>{post.title}</div>
            <div>{post.description}</div>
            <div>{post.username}</div>
          </div>;
        })
      }
    </div>
  );
}

export default App;
