import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Post() {
    let { id } = useParams();
    const [post, setPost] = useState({});
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
    }, []);

    return (
        <div>
            <div>
                <div>{post.title}</div>
                <div>{post.description}</div>
                <div>{post.username}</div>
                <div>{post.createdAt}</div><br/>
            </div>

            <div>
                <div>
                    Create Comment
                </div><br/>
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
