import axiosInstance, { endpoints } from '../axios';

// Login User
export const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post(endpoints.auth.login, {
      email,
      password,
    });

    const { token } = response.data;

    // Store the token in localStorage or sessionStorage
    localStorage.setItem("token", token); // Replace with sessionStorage if preferred

    return response.data;
  } catch (error) {
    throw error.response?.data || "Login failed. Please try again.";
  }
};

// Register User
export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post(endpoints.auth.register, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Registration failed. Please try again.";
  }
};

// Forgot Password
export const forgotPassword = async (email) => {
  try {
    const response = await axiosInstance.post(endpoints.auth.forgotPassword, {
      email,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to send password reset email.";
  }
};

// Verify OTP
export const verifyOTP = async (email, otp) => {
  try {
    const response = await axiosInstance.post(endpoints.auth.verifyOTP, {
      email,
      otp,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "OTP verification failed.";
  }
};

// Reset Password
export async function resetPassword(email, newPassword, confirmPassword) {
  try {
    const response = await axiosInstance.post(endpoints.auth.resetPassword, {
      email,
      newPassword,
      confirmPassword,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Password reset failed.";
  }
}
