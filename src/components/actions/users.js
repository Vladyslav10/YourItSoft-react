import axios from 'axios'
import {setFetchError, setIsFetching, setUsers, setTotalCount} from "../../reducers/usersReducer";

export const getUsers = (currentPage, perPage) => {
    
    return async (dispatch) => {
        try {
            dispatch(setIsFetching(true))
            const response = await axios.get(`https://jsonplaceholder.typicode.com/users?_limit=${perPage}&_page=${currentPage}`);
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