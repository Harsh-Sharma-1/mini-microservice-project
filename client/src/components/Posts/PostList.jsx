import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import PostItem from './PostItem';

const PostList = () => {
    const [posts, setPosts] = useState({});

    const fetchPosts = async () => {
        const res = await axios.get('http://localhost:3002/posts');
        setPosts(res.data);
    };
    useEffect(() => {
        fetchPosts();
    }, []);

    const renderedPosts = Object.values(posts);

    return (
        <div className='d-flex flex-row flex-wrap justify-content-between'>
            {renderedPosts.map((data, i) => {
                return <PostItem key={i} data={data} />;
            })}
        </div>
    );
};

export default PostList;
