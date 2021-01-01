import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    entities: [],
  },
  reducers: {
    setUsers: (state, action) => {
      state.entities = [...action.payload];
    },
  },
});

export const { setUsers } = usersSlice.actions;
export const selectUsers = (state) => state.users;

export default usersSlice.reducer;
