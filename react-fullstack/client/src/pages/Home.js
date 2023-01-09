import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/post/list").then((res) => {
            //console.log(res.data);
            setPostList(res.data);
        });
    }, []);

    return (
        <div>
            <div>StoryBook</div>
            {
                postList.map((post, i) => {
                    return (
                        <div key={post.id}>
                            <div>{post.title}</div>
                            <div>{post.description}</div>
                            <div>{post.username}</div>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default Home