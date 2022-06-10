import {
    applyMiddleware,
    combineReducers,
    configureStore,
    MiddlewareArray,
} from "@reduxjs/toolkit";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    // userEvents: userEventsReducer
});

export type RootState = ReturnType<typeof rootReducer>;
const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk],
});

export default store;
