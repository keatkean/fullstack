import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreatePost() {
    const [post, setPost] = useState({
        title: "",
        description: ""
    });
    const navigate = useNavigate();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setPost(values => ({ ...values, [name]: value }))
    };

    const createPost = (event) => {
        axios.post("/post/create", post).then((res) => {
            console.log(res.data);
            navigate("/");
        });
    };

    return (
        <div>
            <div>Create Post</div>
            <div>
                <div>
                    <label>Title:</label>
                    <input
                        name="title"
                        value={post.title}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Descrition:</label>
                    <input
                        name="description"
                        value={post.description}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <button onClick={createPost}>Create Post</button>
                </div>
            </div>
        </div>
    )
}

export default CreatePost