import { createStore, applyMiddleware, combineReducers } from "redux";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import thunkMiddleware from "redux-thunk";
import usersReducer from "../slices/usersSlice";
import postsReducer from "../slices/postsSlice";
import profileReducer from "../slices/profileSlice";

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const combinedReducer = combineReducers({
  users: usersReducer,
  posts: postsReducer,
  profile: profileReducer,
});

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    if (state.users.users) nextState.users.users = state.users.users;
    if (state.posts.posts) nextState.posts.posts = state.posts.posts;
    if (state.profile.profile)
      nextState.profile.profile = state.profile.profile;
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

const initStore = () => {
  return createStore(reducer, bindMiddleware([thunkMiddleware]));
};

export const wrapper = createWrapper(initStore);
