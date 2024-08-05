import axios from "axios";
import axiosConfig from "./config/axios";

const axiosInstance = axios.create(axiosConfig);

// Menambahkan interceptor request untuk menambahkan token ke setiap request
axiosInstance.interceptors.request.use(
	(config) => {
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default axiosInstance;
