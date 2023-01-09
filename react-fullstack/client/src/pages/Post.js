import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Post() {
    let { id } = useParams();
    const [post, setPost] = useState({});
    const [comment, setComment] = useState({
        PostId: id,
        text: ""
    });
    const [commentList, setCommentList] = useState([]);

    useEffect(() => {
        axios.get(`/post/details/${id}`).then((res) => {
            //console.log(res.data);
            setPost(res.data);
        });

        axios.get(`/comment/list/${id}`).then((res) => {
            //console.log(res.data);
            setCommentList(res.data);
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setComment(values => ({ ...values, [name]: value }));
    };

    const onSubmit = (event) => {
        event.preventDefault();
        axios.post("/comment/create", comment).then((res) => {
            console.log(res.data);
            setComment(values => ({ ...values, text: "" }));
            setCommentList([res.data, ...commentList]);
        });
    };

    return (
        <div>
            <div>
                <div>{post.title}</div>
                <div>{post.description}</div>
                <div>{post.username}</div>
                <div>{post.createdAt}</div><br />
            </div>

            <div>
                <div>
                    <form onSubmit={onSubmit}>
                        <div>
                            <input
                                name="text"
                                value={comment.text}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <input type="submit" value="Add Comment" />
                        </div>
                    </form>
                </div><br />
                <div>
                    {
                        commentList.map((comment, i) => {
                            return (
                                <div key={comment.id}>
                                    <div>{comment.text}</div>
                                    <div>{comment.username}</div><br />
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Post
