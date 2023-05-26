export interface IModalSlice {
  isOpenLikeModal: boolean;
  likesUser: any[];
  postModal: any;
  isPostModal: boolean;
  isOpenNewPostModal: boolean;
  isOpenPostMenuModal: boolean;
  postMenuControl: any;
  isDeleteComment: boolean;
}

export interface IProfileSlice {
  isEditProfile: boolean;
  name: string;
  username: string;
  profilePicture: string;
  bio: string;
  isProfileSetting: boolean;
  isChangePassword: boolean;
}

export interface IToast {
  position: string;
  autoClose: number;
  hideProgressBar: boolean;
  closeOnClick: boolean;
  pauseOnHover: boolean;
  draggable: boolean;
  progress?: undefined;
  theme: string;
}

export interface IUser {
  _id: string;
  name: string;
  username: string;
  email: string;
  profilePicture: string;
  bio: string;
  password: string;
  isAdmin: boolean;
  posts: IPost[];
  followers: string[];
  followings: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IPost {
  _id: string;
  img: string;
  caption: string;
  userId: IUser;
  likes: IUser[];
  comments: IComment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IComment {
  comment: string;
  date: Date;
  userId: IUser;
  _id: string;
}

export interface DataMessage {
  message: string;
  status: boolean;
}

export interface IUpdateProfile {
  name: string;
  username: string;
  profilePicture: string;
  bio: string;
}

export interface IUpdatePassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface IError {
  response?: {
    data?: {
      message: string;
    };
  };
  message: string;
}

interface IUserForNotification
  extends Pick<IUser, "_id" | "username" | "profilePicture"> {}
interface IPostForNotification {
  _id: string;
  img: string;
  userId: string;
}

export interface INotification {
  _id: string;
  recipient: string;
  sender: IUserForNotification;
  post?: IPostForNotification;
  comment?: string;
  type: string;
  createdAt: Date;
}
