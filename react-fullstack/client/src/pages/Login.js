import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function Login() {
    const navigate = useNavigate();

    const initialValues = {
        username: "",
        password: ""
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(4).max(20).required(),
        password: Yup.string().min(8).max(20).required()
    });

    const onSubmit = (data) => {
        axios.post("/user/login", data)
            .then((res) => {
                sessionStorage.setItem("accessToken", res.data.accessToken);
                navigate("/");
            })
            .catch(function (error) {
                alert(error.response.data.message);
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
                    <button type="submit">Login</button>
                </Form>
            </Formik>
        </div>
    )
}

export default Login