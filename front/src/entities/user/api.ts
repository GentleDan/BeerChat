import { AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";
import { axiosDefault } from "../../shared/lib/axios";
import { User } from "./model";

type RegisterUserProps = {
  login: string;
  password: string;
  username: string;
};

type LoginProps = {
  login: string;
  password: string;
};

type ChangeUserDataProps = {
  username: string;
};

type AuthResponse = { token: string; user: User };

export const registerUser = (
  params: RegisterUserProps,
): Promise<AxiosResponse<AuthResponse>> =>
  axiosDefault.post("/user/registration", params);

export const login = (
  params: LoginProps,
): Promise<AxiosResponse<AuthResponse>> =>
  axiosDefault.post("/user/login", params);

export const changeUserData = (
  params: ChangeUserDataProps,
): Promise<AxiosResponse<User>> => axiosDefault.post("/user/change", params);

export const getContacts = () =>
  useQuery({
    queryKey: ["contacts"],
    queryFn: () =>
      axiosDefault
        .get("/user/contacts")
        .then(({ data }: AxiosResponse<User[]>) => data),
    refetchOnWindowFocus: true,
  });
