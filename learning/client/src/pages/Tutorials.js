import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import http from '../http';

function Tutorials() {
    const [tutorialList, setTutorialList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        http.get("/tutorial/").then((res) => {
            //console.log(res.data);
            setTutorialList(res.data);
        });
    }, []);

    return (
        <div>
            <div>Tutorials</div><br />
            {
                tutorialList.map((post, i) => {
                    return (
                        <div key={post.id} onClick={() => { navigate(`/post/${post.id}`) }}>
                            <div>{post.title}</div>
                            <div>{post.description}</div>
                            <br />
                        </div>
                    );
                })
            }
        </div>
    )
}

export default Tutorials