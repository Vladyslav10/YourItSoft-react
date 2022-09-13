import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsPostActive } from '../../reducers/postsReducer';
import { getUserPosts } from '../actions/users';
import './User.scss';

const User = (props) => {
    const user = props.user;
    const dispatch = useDispatch();
    const isPostsActive = useSelector((state) => state.users.isPostsActive);

    function getAllUserPosts() {
        dispatch(setIsPostActive(true))
        dispatch(getUserPosts(user.id))
    }

    return (
        <article id={user.id} className={isPostsActive ? 'user active' : 'user'}>
            <p className="user__name">{user.name}</p>
            <p className="user__email">{user.email}</p>
            <p className="user__phone">{user.phone}</p>
            <p className="user__zipcode">{user.address.zipcode}</p>
            <button onClick={()=> getAllUserPosts()} className="user__btn">View all user post</button>
        </article>
    );
};

export default User;