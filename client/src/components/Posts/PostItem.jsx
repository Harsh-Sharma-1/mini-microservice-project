import React from 'react';
import { CommentCreate, CommentList } from '../Comments';

const PostItem = ({ data: { title, id } }) => {
    return (
        <div
            className='card'
            style={{
                width: '30%',
                marginBottom: '20px',
            }}
        >
            <div className='card-body'>
                <h4>{title}</h4>
                <CommentList postId={id} />

                <h6>New comment</h6>
                <CommentCreate postId={id} />
            </div>
        </div>
    );
};

export default PostItem;
