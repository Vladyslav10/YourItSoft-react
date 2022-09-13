import axios from 'axios'
import {setFetchError, setIsFetching, setUsers, setTotalCount} from "../../reducers/usersReducer";
import {setPosts, setPostFetchError, setIsPostFetching} from '../../reducers/postsReducer';

export const getUsers = (currentPage, perPage) => {
    
    return async (dispatch) => {
        try {
            dispatch(setIsFetching(true))
            const response = await axios.get(`https://jsonplaceholder.typicode.com/users?_limit=${perPage}&_page=${currentPage}`)
            dispatch(setUsers(response.data))
        } catch (e) {
            dispatch(setFetchError(true))
            dispatch(setIsFetching(false))
            setTimeout(()=> {
                dispatch(setFetchError(false))
            }, 4000)
        }
    }
}

export const getNumberOfUsers = () => {
    
    return async (dispatch) => {
        try {
            const allUsers = await axios.get(`https://jsonplaceholder.typicode.com/users`);
            dispatch(setTotalCount(allUsers.data.length))
        } catch (e) {
            dispatch(setFetchError(true))
            setTimeout(()=> {
                dispatch(setFetchError(false))
            }, 4000)
        }
    }
}

export const getUserPosts = (id) => {
    return async (dispatch) => {
        try {
            dispatch(setIsPostFetching(true))
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}&_limit=5`)
            dispatch(setPosts(response.data))
        } catch {
            dispatch(setPostFetchError(true))
            setTimeout(()=> {
                dispatch(setPostFetchError(false))
            }, 4000)
        }
    }
}