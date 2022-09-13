import React, { useEffect } from "react";
import arLeft from '../../assets/left.png';
import arRight from '../../assets/right.png';
import { useDispatch, useSelector } from "react-redux";
import { useSearch } from "../../custom-hooks/useSortAndSearch";
import { setIsPostActive } from "../../reducers/postsReducer";
import { setCurrentPage } from "../../reducers/usersReducer";
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

  const perPage = useSelector((state) => state.users.perPage);
  const currentPage = useSelector((state) => state.users.currentPage);

  const isFetchError = useSelector((state) => state.users.isFetchError);
  const isFetching = useSelector((state) => state.users.isFetching);
  const isPostFetchError = useSelector((state) => state.posts.isPostFetchError);
  const isPostFetching = useSelector((state) => state.posts.isPostFetching);
  const numberOfPages = useSelector((state) => state.users.numberOfpages);

  const searchedPost = useSearch(users, sortActive, searchQuery);

  useEffect(() => {
    dispatch(getNumberOfUsers(perPage));
  }, []);

  useEffect(() => {
    dispatch(getUsers(currentPage, perPage));
  }, [currentPage]);

  function nextPage() {
    dispatch(setIsPostActive(false))
    if(numberOfPages > currentPage) {
      dispatch(setCurrentPage(currentPage + 1))
    } else {
      dispatch(setCurrentPage(1))
    }
  }

  function prevPage() {
    dispatch(setIsPostActive(false))
    if(currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1))
    } else {
      dispatch(setCurrentPage(numberOfPages))
    }
  }
  
  return (
    <main className="main">
      <div className="main__container container">
        {isFetchError && (
          <p className="alert alert-danger" role="alert">
            Ooops something wrong! Please reload page!
          </p>
        )}
        {isFetching && <div className="loader"></div>}
        <div className={isPostsActive ? "main__row small" : "main__row"}>
            <div className="main__column main__column-users">
                {isFetching === false && !searchedPost.length 
                    ? <h2 className="user-error">Posts not Found</h2>
                    : searchedPost.map(user => <User key={user.id} user={user}/>)
                }
            </div>
            <div id="post-area" className={ isPostsActive ? "main__column main__column-posts" : "main__column main__column-posts disabled"}>
              {isPostFetchError && (
                <p className="alert alert-danger" role="alert">
                  Posts not loaded, please try again later! 
                </p>
              )}
              {isPostFetching
                ? <div className="loader"></div>
                : posts.map(post => <Post key={post.id+post.userId} post={post}/>)
              }
              <span onClick={()=> dispatch(setIsPostActive(false))}>x</span>
            </div>
        </div>
        {!isFetching && (
          <div className="main__bottom">
            <div onClick={()=> prevPage()} className="main__bottom-prev">
              <img src={arLeft} alt="arrow left"/>
              <p className="main__bottom-text">Previous</p>
            </div>
            <div onClick={()=> nextPage()} className="main__bottom-next">
              <p className="main__bottom-text">Next</p>
              <img src={arRight} alt="arrow right"/>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Main;
