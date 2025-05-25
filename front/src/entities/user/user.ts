import { type User } from "./model";

export const USER_KEY = "user";

export const setUserLs = (user: User) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUserLs = () => {
  const user = localStorage.getItem(USER_KEY);
  if (!user) return null;

  try {
    return JSON.parse(user) as User;
  } catch {
    deleteUser();
  }

  return null;
};

export const deleteUser = () => localStorage.removeItem(USER_KEY);
