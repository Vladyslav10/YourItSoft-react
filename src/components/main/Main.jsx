import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearch } from "../../custom-hooks/useSortAndSearch";
import { setIsPostActive } from "../../reducers/postsReducer";
import { setNumberOfPages } from "../../reducers/usersReducer";
import { getNumberOfUsers, getUsers } from "../actions/users";
import Post from "../post/Post";
import User from "../user/User";
import "./Main.scss";

const Main = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const posts = useSelector((state) => state.posts.posts);
  const isPostsActive = useSelector((state) => state.posts.isPostsActive);
  const sortActive = useSelector((state) => state.users.sortActive);
  const searchQuery = useSelector(state => state.users.searchQuery);

  const totalCount = useSelector((state) => state.users.totalCount);
  const perPage = useSelector((state) => state.users.perPage);
  const currentPage = useSelector((state) => state.users.currentPage);

  const isFetchError = useSelector((state) => state.users.isFetchError);
  const isFetching = useSelector((state) => state.users.isFetching);
  const isPostFetchError = useSelector((state) => state.posts.isPostFetchError);
  const isPostFetching = useSelector((state) => state.posts.isPostFetching);
  

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
        <div className={isPostsActive ? "main__row small" : "main__row"}>
            <div className="main__column main__column-users">
                {isFetching && <div className="loader"></div>}
                {isFetching === false && !searchedPost.length 
                    ? <h2 className="user-error">Posts not Found</h2>
                    : searchedPost.map(user => <User key={user.id} user={user}/>)
                }
            </div>
            <div className={ isPostsActive ? "main__column main__column-posts" : "main__column main__column-posts disabled"}>
              {isPostFetchError && (
                <div className="alert alert-danger" role="alert">
                  Posts not loaded, please try again later! 
                </div>
              )}
              {isPostFetching
                ? <div className="loader"></div>
                : posts.map(post => <Post key={post.id+post.userId} post={post}/>)
              }
              <span onClick={()=> dispatch(setIsPostActive(false))}>x</span>
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
