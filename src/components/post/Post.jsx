import React from 'react';
import './Post.scss';

const Post = (props) => {
    const post = props.post;

    return (
        <article className='post'>
            <h2 className='post__title'>{post.title}</h2>
            <p className='post__text'>{post.body}</p>
        </article>
    );
};

export default Post;