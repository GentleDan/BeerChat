import axios from "axios";

export const axiosDefault = axios.create({
  baseURL: import.meta.env.VITE_STAGE_API,
});

export const setToken = (token: string) => {
  localStorage.setItem(import.meta.env.VITE_TOKEN_KEY, token);
  setBearer(token);
};

export const setBearer = (token: string) => {
  axiosDefault.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const getToken = (): string | null => {
  const token = localStorage.getItem(import.meta.env.VITE_TOKEN_KEY);
  if (!token) return null;

  return token;
};

export const initApi = () => {
  const token = getToken();
  if (token) setBearer(token);
};

export const deleteToken = () =>
  localStorage.removeItem(import.meta.env.VITE_TOKEN_KEY);
