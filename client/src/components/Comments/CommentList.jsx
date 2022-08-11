import React from 'react';
const CommentList = ({ data }) => {
    return (
        <div>
            <ul className='list-group mt-2'>
                {data.map((item, i) => {
                    return (
                        <li key={i} className='list-group-item'>
                            {item.status === 'pending'
                                ? 'this comment is awaiting moderation'
                                : item.status === 'rejected'
                                ? 'this comment got rejected'
                                : item.content}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default CommentList;
