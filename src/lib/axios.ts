import env from "@/config/envConfig";
import axios, { type AxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
  baseURL: env.baseUrl,
  withCredentials: true,
});

axios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log(error.response.status);

    const originalRequest = error.config as AxiosRequestConfig;

    if (
      error.response.status === 500 &&
      error.response.data.message === "jwt expired"
    ) {
      console.log("Token is expired");

      try {
        const res = await axiosInstance.post("/auth/refresh-token");
        console.log(res);
        return axiosInstance(originalRequest);
      } catch (error) {
        console.log(error);
      }
    }

    return Promise.reject(error);
  }
);
