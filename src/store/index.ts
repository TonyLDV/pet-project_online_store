import thunk from "redux-thunk";
import { rootReducer } from "./reducers";
import { applyMiddleware, createStore } from "redux";

export const store = createStore(rootReducer, applyMiddleware(thunk));
