import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import http from '../http';

function EditTutorial() {
    const { id } = useParams();

    useEffect(() => {
        http.get(`/tutorial/${id}`).then((res) => {
            console.log(res.data);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>EditTutorial</div>
    );
}

export default EditTutorial;