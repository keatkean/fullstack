import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const initialValues = {
        PostId: id,
        text: ""
    };

    const validationSchema = Yup.object().shape({
        text: Yup.string().max(500).required()
    });

    const onSubmit = (data, { resetForm }) => {
        axios.post("/comment/create", data).then((res) => {
            console.log(res);
            resetForm();
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
                    <Formik initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit} >
                        <Form>
                            <div>
                                <Field name="text" />
                                <ErrorMessage name="text" component="span" />
                            </div>
                            <button type="submit">Add Comment</button>
                        </Form>
                    </Formik>
                </div>
                <br />
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
