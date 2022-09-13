const SET_USERS = "SET_USERS";
const SET_IS_FETCHING = "SET_IS_FETCHING";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_FETCH_ERROR = "SET_FETCH_ERROR";
const SET_SEARCH_QUERY = "SET_SEARCH_QUERY";
const SET_SORT_ACTIVE = "SET_SORT_ACTIVE";
const SET_TOTAL_COUNT = "SET_TOTAL_COUNT";
const SET_NUMBER_OF_PAGES = "SET_NUMBER_OF_USERS";

const defaultState = {
    users: [],
    isFetching: true,
    isFetchError: false,
    currentPage:1,
    perPage:4,
    totalCount:0,
    numberOfpages: 0,
    searchQuery: '',
    sortActive: false,
}


export default function reposReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.payload,
                isFetching: false,
            }
        case SET_TOTAL_COUNT:
            return {
                ...state,
                totalCount: action.payload,
            }
        case SET_NUMBER_OF_PAGES:
            return {
                ...state,
                numberOfpages: action.payload,
            }
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.payload
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload
            }
        case SET_FETCH_ERROR:
            return {
                ...state,
                isFetchError: action.payload
            }
        case SET_SEARCH_QUERY:
            return {
                ...state,
                searchQuery: action.payload
            }
        case SET_SORT_ACTIVE:
            return {
                ...state,
                sortActive: action.payload
            }
        default:
            return state
    }
}

export const setUsers = (users) => ({type:SET_USERS, payload:users});
export const setIsFetching = (bool) => ({type:SET_IS_FETCHING, payload:bool});
export const setCurrentPage = (page) => ({type:SET_CURRENT_PAGE, payload:page});
export const setFetchError = (bool) => ({type:SET_FETCH_ERROR, payload:bool});
export const setSearchQuery = (string) => ({type:SET_SEARCH_QUERY, payload:string});
export const setSortActive = (bool) => ({type:SET_SORT_ACTIVE, payload:bool});
export const setTotalCount = (num) => ({type:SET_TOTAL_COUNT, payload:num});
export const setNumberOfPages = (num) => ({type:SET_NUMBER_OF_PAGES, payload:num});