import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const CommentCreate = ({ postId }) => {
    const [content, setContent] = useState('');
    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`http://localhost:3001/posts/${postId}/comments`, {
            content,
        });
        setContent('');
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <input
                        value={content}
                        type='text'
                        className='form-control'
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <button className='btn btn-primary mt-2'>Submit</button>
            </form>
        </div>
    );
};

export default CommentCreate;
