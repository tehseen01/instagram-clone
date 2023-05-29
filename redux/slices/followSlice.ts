import { createSlice } from "@reduxjs/toolkit";

const followSlice = createSlice({
  name: "follow",
  initialState: {
    isFollowModal: false,
    isFollowData: false,
  },
  reducers: {
    openFollowModal: (state, action) => {
      state.isFollowModal = action.payload;
    },

    closeFollowModal: (state, action) => {
      state.isFollowModal = action.payload;
    },

    showFollowData: (state, action) => {
      state.isFollowData = action.payload;
    },
  },
});

export const { openFollowModal, closeFollowModal, showFollowData } =
  followSlice.actions;

export default followSlice.reducer;
