import React from 'react';
import axios from 'axios';
import { useState } from 'react';

const PostCreate = () => {
    const [title, setTitle] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();
        await axios.post('http://localhost:3000/posts', {
            title,
        });
        setTitle('');
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label>Title</label>
                    <input
                        type='text'
                        className='form-control'
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                    />
                </div>
                <button className='btn btn-primary mt-3'>Submit</button>
            </form>
        </div>
    );
};

export default PostCreate;
