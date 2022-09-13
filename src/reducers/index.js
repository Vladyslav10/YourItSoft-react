import {applyMiddleware, combineReducers} from "redux";
import {legacy_createStore as createStore} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import usersReducer from "./usersReducer";

const rootReducer = combineReducers({
    users: usersReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));