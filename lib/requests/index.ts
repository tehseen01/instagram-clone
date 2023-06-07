import axios from "axios";

export * from "./auth";
export * from "./post";
export * from "./user";
export * from "./chat";

export const makeRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
