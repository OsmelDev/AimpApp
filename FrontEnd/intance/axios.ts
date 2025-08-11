import axios from "axios";

export const axiosIntance = () => {
  const playList = axios.create({
    baseURL: "http://localhost:3128/playlist",
    withCredentials: true,
  });

  return { playList };
};
