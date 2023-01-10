import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function CreatePost() {
    const navigate = useNavigate();

    const initialValues = {
        title: "",
        description: ""
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().max(100).required(),
        description: Yup.string().max(500).required()
    });

    const onSubmit = (data) => {
        axios.post("/post/create", data)
            .then((res) => {
                console.log(res.data);
                navigate("/");
            })
            .catch(function (error) {
                console.log(error.response);
            });
    };

    return (
        <div>
            <div>Create Post</div>
            <Formik initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit} >
                <Form>
                    <div>
                        <label>Title:</label>
                        <Field name="title" />
                        <ErrorMessage name="title" component="span" />
                    </div>
                    <div>
                        <label>Description:</label>
                        <Field name="description" />
                        <ErrorMessage name="description" component="span" />
                    </div>
                    <button type="submit">Create Post</button>
                </Form>
            </Formik>
        </div>
    )
}

export default CreatePost