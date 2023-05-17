const { createSlice } = require("@reduxjs/toolkit");
import { PayloadAction } from "@reduxjs/toolkit";
import { IModalSlice } from "../../lib/interface";

interface ModalState extends IModalSlice {}

const initialState: ModalState = {
  isOpenLikeModal: false,
  likesUser: [],
  postModal: {},
  isPostModal: false,
  isOpenNewPostModal: false,
  isOpenPostMenuModal: false,
  postMenuControl: {},
  isDeleteComment: false,
}

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    // LIKE MODAL ACTIONS
    openLikeModal: (state: IModalSlice, action: PayloadAction<boolean>) => {
      state.isOpenLikeModal = action.payload;
      if (state.isOpenLikeModal === true) {
        document.body.style.overflow = "hidden";
      }
    },

    closeLikeModal: (state: IModalSlice, action: PayloadAction<boolean>) => {
      state.isOpenLikeModal = action.payload;
      if (state.isOpenLikeModal === false) {
        document.body.style.overflow = "visible";
      }
    },

    handelLikesUser: (state: IModalSlice, action: PayloadAction<[]>) => {
      state.likesUser = action.payload;
    },

    // COMMENT MODAL ACTIONS
    openPostModal: (state: IModalSlice, action: PayloadAction<boolean>) => {
      state.isPostModal = action.payload;
      if (state.isPostModal === true) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "visible";
      }
    },

    closePostModal: (state: IModalSlice, action: PayloadAction<boolean>) => {
      state.isPostModal = action.payload;
      if (state.isPostModal === false) {
        document.body.style.overflow = "visible";
      }
    },

    handelPostModal: (state: IModalSlice, action: PayloadAction<boolean>) => {
      state.postModal = action.payload;
    },

    // NEW POST MODAL ACTIONS
    openNewPostModal: (state: IModalSlice, action: PayloadAction<boolean>) => {
      state.isOpenNewPostModal = action.payload;
      if (state.isOpenNewPostModal === true) {
        document.body.style.overflow = "hidden";
      }
    },

    closeNewPostModal: (state: IModalSlice, action: PayloadAction<boolean>) => {
      state.isOpenNewPostModal = action.payload;
      if (state.isOpenNewPostModal === false) {
        document.body.style.overflow = "visible";
      }
    },

    // POST MENU MODAL
    openPostMenuModal: (state: IModalSlice, action: PayloadAction<boolean>) => {
      state.isOpenPostMenuModal = action.payload;
      if (state.isOpenPostMenuModal === true) {
        document.body.style.overflow = "hidden";
      }
    },

    handlePostMenu: (state: IModalSlice, action: PayloadAction<boolean>) => {
      state.postMenuControl = action.payload;
    },

    closePostMenuModal: (state: IModalSlice, action: PayloadAction<boolean>) => {
      state.isOpenPostMenuModal = action.payload;
      if (state.isOpenPostMenuModal === false) {
        document.body.style.overflow = "visible";
      }
    },

    // DELETE COMMENT
    openDeleteComment: (state: IModalSlice, action: PayloadAction<boolean>) => {
      state.isDeleteComment = action.payload;
    },

    closeDeleteComment: (state: IModalSlice, action: PayloadAction<boolean>) => {
      state.isDeleteComment = action.payload;
    },
  },
});

export const {
  closeLikeModal,
  openLikeModal,
  handelLikesUser,
  handelPostModal,
  openPostModal,
  closePostModal,
  openNewPostModal,
  closeNewPostModal,
  openPostMenuModal,
  closePostMenuModal,
  handlePostMenu,
  openDeleteComment,
  closeDeleteComment,
} = modalSlice.actions;

export default modalSlice.reducer;
