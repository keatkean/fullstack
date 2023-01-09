import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const initialValues = {
        username: "",
        password: ""
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(4).max(20).required(),
        password: Yup.string().min(8).max(20).required()
    });

    const onSubmit = (data) => {
        axios.post("/user/login", data).then((res) => {
            if (res.data.error) {
                setError(res.data.error);
            }
            else {
                navigate("/");
            }
        });
    };

    return (
        <div>
            <div>Login</div>
            <Formik initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit} >
                <Form>
                    <div>
                        <label>Username:</label>
                        <Field name="username" />
                        <ErrorMessage name="username" component="span" />
                    </div>
                    <div>
                        <label>Password:</label>
                        <Field name="password" type="password" />
                        <ErrorMessage name="password" component="span" />
                    </div>
                    <div>{error}</div>
                    <button type="submit">Login</button>
                </Form>
            </Formik>
        </div>
    )
}

export default Login