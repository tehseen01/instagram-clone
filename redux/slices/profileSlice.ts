import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProfileSlice } from "../../lib/interface";

interface ProfileState extends IProfileSlice {}

const initialState: ProfileState = {
  isEditProfile: false,
  name: "",
  username: "",
  profilePicture: "",
  bio: "",
  isProfileSetting: false,
  isChangePassword: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    // EDIT PROFILE MODAL
    openEditProfile: (state, action: PayloadAction<boolean>) => {
      state.isEditProfile = action.payload;
    },

    closeEditProfile: (state, action: PayloadAction<boolean>) => {
      state.isEditProfile = action.payload;
    },

    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setProfilePicture: (state, action: PayloadAction<string>) => {
      state.profilePicture = action.payload;
    },
    setBio: (state, action: PayloadAction<string>) => {
      state.bio = action.payload;
    },

    // PROFILE SETTING
    openProfileSetting: (state, action: PayloadAction<boolean>) => {
      state.isProfileSetting = action.payload;
    },
    closeProfileSetting: (state, action: PayloadAction<boolean>) => {
      state.isProfileSetting = action.payload;
    },

    // CHANGE PASSWORD
    openChangePassword: (state, action: PayloadAction<boolean>) => {
      state.isChangePassword = action.payload;
    },

    closeChangePassword: (state, action: PayloadAction<boolean>) => {
      state.isChangePassword = action.payload;
    },
  },
});

export const {
  openEditProfile,
  closeEditProfile,
  setBio,
  setProfilePicture,
  setName,
  setUsername,
  openProfileSetting,
  closeProfileSetting,
  openChangePassword,
  closeChangePassword,
} = profileSlice.actions;

export default profileSlice.reducer;
