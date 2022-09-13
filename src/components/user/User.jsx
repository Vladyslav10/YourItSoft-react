import React from 'react';
import './User.scss';

const User = (props) => {
    const user = props.user;

    return (
        <article id={user.id} className='user'>
            <p className="user__name">{user.name}</p>
            <p className="user__email">{user.email}</p>
            <p className="user__phone">{user.phone}</p>
            <p className="user__zipcode">{user.address.zipcode}</p>
            <button className="user__btn">View all user post</button>
        </article>
    );
};

export default User;