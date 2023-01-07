import React from 'react'
import { useState } from 'react';

function CreatePost() {
    const [post, setPost] = useState(
        {
            title: "",
            description: ""
        }
    );

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setPost(values => ({ ...values, [name]: value }))
    };

    const onSubmit = (event) => {
        event.preventDefault();
        alert(`You have entered: ${post.title} ${post.description}`);
    }

    return (
        <div>
            <div>Create Post</div>
            <form onSubmit={onSubmit}>
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
                    <input type="submit" value="Create Post" />
                </div>
            </form>
        </div>
    )
}

export default CreatePost