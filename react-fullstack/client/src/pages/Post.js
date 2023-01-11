import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import UserContext from '../contexts/UserContext';

function Post() {
    const { id } = useParams();
    const { user } = useContext(UserContext);

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
        postId: id,
        text: ""
    };

    const validationSchema = Yup.object().shape({
        text: Yup.string().max(500).required()
    });

    const onSubmit = (data, { resetForm }) => {
        axios.post("/comment/create", data)
            .then((res) => {
                console.log(res.data);
                resetForm();
                setCommentList([res.data, ...commentList]);
            })
            .catch(function (error) {
                console.log(error.response);
            });
    };

    const deleteComment = (id) => {
        axios.post("/comment/delete", { id: id })
            .then((res) => {
                console.log(res.data);
                setCommentList(commentList.filter((val) => {
                    return val.id !== id;
                }));
            })
            .catch(function (error) {
                console.log(error.response);
            });
    }

    return (
        <div>
            <div>
                <div>{post.title}</div>
                <div>{post.description}</div>
                <div>{post.username}</div>
                <div>{moment(post.updatedAt).format(process.env.REACT_APP_DATETIME_FORMAT)}</div><br />
            </div>

            <div>
                {user && (
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
                        <br />
                    </div>
                )}

                <div>
                    {
                        commentList.map((comment, i) => {
                            return (
                                <div key={comment.id}>
                                    <div>{comment.username}</div>
                                    <div>{comment.text}
                                        {user && user.username === comment.username && (
                                            <button onClick={() => deleteComment(comment.id)}>Delete</button>
                                        )}
                                    </div>
                                    <br />
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
