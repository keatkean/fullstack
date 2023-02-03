import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import http from '../http';

function EditTutorial() {
    const { id } = useParams();

    const [tutorial, setTutorial] = useState({
        title: "",
        description: ""
    });

    useEffect(() => {
        http.get(`/tutorial/${id}`).then((res) => {
            setTutorial(res.data);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>EditTutorial</div>
    );
}

export default EditTutorial;