import {applyMiddleware, combineReducers} from "redux";
import {legacy_createStore as createStore} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import usersReducer from "./usersReducer";
import postsReducer from "./postsReducer";

const rootReducer = combineReducers({
    users: usersReducer,
    posts: postsReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));