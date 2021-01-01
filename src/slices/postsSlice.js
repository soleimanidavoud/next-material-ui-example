import { createSlice } from "@reduxjs/toolkit";

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    entities: [],
  },
  reducers: {
    setPosts: (state, action) => {
      state.entities = [...action.payload];
    },
  },
});

export const { setPosts } = postsSlice.actions;
export const selectPosts = (state) => state.posts;

export default postsSlice.reducer;
