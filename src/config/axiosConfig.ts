import axios from "axios";
import { envs } from "@/utils";
import { useAuthStore } from "@/store/useAuthStore";

const { VITE_API_URL: baseURL } = envs;

const validateStatus = (status: number) => {
  if (status === 401) {
    // logout();
  }
  return status >= 200 && status < 300;
};

const axiosInst = axios.create({
  baseURL,
  timeout: 50_000,
  validateStatus,
});

axiosInst.interceptors.request.use((config) => {
  const token = useAuthStore.getState().creds.token;
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  return { ...config };
});

export { axiosInst };