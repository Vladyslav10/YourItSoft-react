const SET_POSTS = "SET_POSTS";
const SET_IS_POST_FETCHING = "SET_IS_POST_FETCHING";
const SET_POST_FETCH_ERROR = "SET_POST_FETCH_ERROR";
const SET_IS_POST_ACTIVE = "SET_IS_POST_ACTIVE";

const defaultState = {
    posts: [],
    isPostFetching: true,
    isPostFetchError: false,
    isPostsActive: false,
}

export default function reposReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_POSTS:
            return {
                ...state,
                posts: action.payload,
                isPostFetching: false,
            }
        case SET_IS_POST_FETCHING:
            return {
                ...state,
                isPostFetching: action.payload
            }
        case SET_POST_FETCH_ERROR:
            return {
                ...state,
                isPostFetchError: action.payload
            }
        case SET_IS_POST_ACTIVE:
            return {
                ...state,
                isPostsActive: action.payload
            }
        default:
            return state
    }
}

export const setPosts = (posts) => ({type:SET_POSTS, payload:posts});
export const setIsPostFetching = (bool) => ({type:SET_IS_POST_FETCHING, payload:bool});
export const setIsPostActive = (bool) => ({type:SET_IS_POST_ACTIVE, payload:bool});
export const setPostFetchError = (bool) => ({type:SET_POST_FETCH_ERROR, payload:bool});