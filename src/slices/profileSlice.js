import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    entities: {},
  },
  reducers: {
    setProfile: (state, action) => {
      state.entities = action.payload;
    },
  },
});

export const { setProfile } = profileSlice.actions;
export const selectProfile = (state) => state.profile;

export default profileSlice.reducer;
