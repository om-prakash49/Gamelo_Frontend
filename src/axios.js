import axios from "axios";

// export const BASE_URL = "https://gamelo-backend.onrender.com/api";
export const BASE_URL = "http://localhost:5000/api";

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
});

axiosInstance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");
		if (token) {
			config.headers["Authorization"] = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export const endpoints = {
	auth: {
		register: "/signup",
		login: "/signin",
		forgotPassword: "/send-otp",
		resetPassword: "/reset-password",
		verifyOTP: "/verify-otp",
	},
	user: {
		getProfile: "/profile",
		updateProfile: "/profile",
	},
	games: {
		recentGames: "game/recent-games",
	},
};

export default axiosInstance;
