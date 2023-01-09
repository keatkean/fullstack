import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Post() {
    let { id } = useParams();
    const [post, setPost] = useState({});

    useEffect(() => {
        axios.get(`/post/details/${id}`).then((res) => {
            //console.log(res.data);
            setPost(res.data);
        });
    }, []);

    return (
        <div>
            <div>{post.title}</div>
            <div>{post.description}</div>
            <div>{post.username}</div>
            <div>{post.createdAt}</div>
        </div>
    )
}

export default Post
