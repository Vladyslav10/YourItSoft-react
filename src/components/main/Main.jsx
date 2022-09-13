import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearch } from "../../custom-hooks/useSortAndSearch";
import { setNumberOfPages } from "../../reducers/usersReducer";
import { getNumberOfUsers, getUsers } from "../actions/users";
import User from "../user/User";
import "./Main.scss";

const Main = (props) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.items);
  const isActive = useSelector((state) => state.users.isActive);
  const sortActive = useSelector((state) => state.users.sortActive);
  const searchQuery = useSelector(state => state.users.searchQuery);
  const totalCount = useSelector((state) => state.users.totalCount);
  const perPage = useSelector((state) => state.users.perPage);
  const isFetchError = useSelector((state) => state.users.isFetchError);
  const isFetching = useSelector((state) => state.users.isFetching);
  const currentPage = useSelector((state) => state.users.currentPage);

  const searchedPost = useSearch(users, sortActive, searchQuery);

  useEffect(() => {
    dispatch(getNumberOfUsers());
    dispatch(setNumberOfPages(Math.ceil(totalCount / perPage)));
  }, []);

  useEffect(() => {
    dispatch(getUsers(currentPage, perPage));
  }, [currentPage]);

  return (
    <main className="main">
      <div className="main__container container">
        {isFetchError && (
          <div className="alert alert-danger" role="alert">
           Ooops something wrong! Please reload page!
          </div>
        )}
        <div className={isActive ? "main__row small" : "main__row"}>
            <div className="main__column main__column-users">
                {isFetching && <div className="loader"></div>}
                {isFetching === false && !searchedPost.length 
                    ? <h2 className="user-error">Posts not Found</h2>
                    : searchedPost.map(user => <User key={user.id} user={user}/>)
                }
            </div>
            <div className={ isActive ? "main__column main__column-posts" : "main__column main__column-posts disabled"}>

            </div>
        </div>
        {!isFetching && (
            <div className="main__bottom"></div>
        )}
      </div>
    </main>
  );
};

export default Main;
