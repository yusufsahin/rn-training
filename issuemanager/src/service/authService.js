import axiosInstance from "./api";

export const login = async (data) => {

    const { username, password } = data;
  try {
    const response = await axiosInstance.post("/login", { username, password });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const register = async (username, password) => {
  try {
    const response = await axiosInstance.post("/register", { username, password });
    return response.data;
  } catch (error) {
    throw error;
  }
}