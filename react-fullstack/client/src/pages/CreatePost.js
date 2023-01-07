import React from 'react'
import { useState } from 'react';

function CreatePost() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const onSubmit = (event) => {
        event.preventDefault();
        alert(`You have entered: ${title} ${description}`);
    }

    return (
        <div>
            <div>Create Post</div>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label>Descrition:</label>
                    <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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