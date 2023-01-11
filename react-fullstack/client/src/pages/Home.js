import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
    const [postList, setPostList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("/post/list").then((res) => {
            //console.log(res.data);
            setPostList(res.data);
        });
    }, []);

    return (
        <div>
            <div>StoryBook</div><br/>
            {
                postList.map((post, i) => {
                    return (
                        <div key={post.id} onClick={() => { navigate(`/post/${post.id}`) }}>
                            <div>{post.title}</div>
                            <div>{post.username}</div>
                            <div>{post.description}</div>
                            <br/>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default Home