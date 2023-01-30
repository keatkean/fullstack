import React, { useEffect } from 'react'
import http from '../http';

function Tutorials() {
    useEffect(() => {
        http.get('/tutorial').then((res) => {
            console.log(res.data);
        });
    }, []);

    return (
        <div>Tutorials</div>
    )
}

export default Tutorials