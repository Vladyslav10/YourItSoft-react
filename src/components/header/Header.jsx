import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, setSortActive } from '../../reducers/usersReducer';
import './Header.scss';

const Header = (props) => {
    const dispatch = useDispatch();
    const searchQuery = useSelector(state => state.users.searchQuery);
    const sortActive = useSelector((state) => state.users.sortActive);
    return (
        <header className="header">
            <div className="header__container container">
                <div className="header__row">
                    <h2 className="header__title">Users</h2>
                    <button onClick={() => dispatch(setSortActive(!sortActive))} className='header__sort'>Sort users</button>
                    <div className="header__search">
                        <input 
                            value={searchQuery} 
                            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                            placeholder='Search' 
                            type="text" 
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;