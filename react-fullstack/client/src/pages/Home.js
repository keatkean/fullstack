import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';

function Home() {
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/post/list").then((res) => {
            //console.log(res.data);
            setPostList(res.data);
        })
    }, []);

    return (
        <div>
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

export default Home