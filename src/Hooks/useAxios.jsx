import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `https://quick-drop-courier-server.vercel.app`,
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
