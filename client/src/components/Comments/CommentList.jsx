import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const CommentList = ({ postId }) => {
    const [comments, setComments] = useState([]);

    const fetchComments = async () => {
        const res = await axios.get(
            `http://localhost:3001/posts/${postId}/comments`
        );
        setComments(res.data);
    };

    useEffect(() => {
        fetchComments();
    }, []);

    return (
        <div>
            <ul className='list-group mt-2'>
                {comments.map((data, i) => {
                    return (
                        <li key={i} className='list-group-item'>
                            {data.content}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default CommentList;
