import { ChangeEvent, FormEvent, RefObject, useRef, useState } from "react";
import { TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import bg from "./ui/authBg.jpeg";
import styles from "./styles.module.scss";

export const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const formRef = useRef<HTMLFormElement | null>(null);
  const onToggle = () => setIsSignIn((prevState) => !prevState);

  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className={styles.page}>
      <img className={styles.page__bg} src={bg} alt="bg" />
      <div className={styles.wrapper}>
        <form
          ref={formRef}
          className={styles.formContainer}
          onSubmit={onSubmitHandler}
        >
          <div className={styles.btnGroup}>
            <div
              className={`${styles.btn} ${isSignIn ? styles.btn_active : ""}`}
              onClick={onToggle}
            >
              Sign in
            </div>
            <button
              className={`${styles.btn} ${!isSignIn ? styles.btn_active : ""}`}
              onClick={onToggle}
            >
              Sign up
            </button>
          </div>
          <div>
            <Typography variant="h1">Welcome</Typography>
            <Typography variant="body2">
              Please {isSignIn ? "login to" : "register"} your account
            </Typography>
          </div>
          {isSignIn ? (
            <LoginContent formRef={formRef} />
          ) : (
            <RegisterContent formRef={formRef} />
          )}
        </form>
      </div>
    </div>
  );
};

type LoginContentProps = {
  formRef: RefObject<HTMLFormElement | null>;
};

const LoginContent = (props: LoginContentProps) => {
  const [fields, setFields] = useState({ login: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFields((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onClickHandler = () => {
    if (!props.formRef?.current?.checkValidity() || isLoading) return;
    setIsLoading(true);
  };

  return (
    <>
      <TextField
        required
        name="login"
        label="Login"
        fullWidth
        variant="standard"
        color="warning"
        value={fields.login}
        onChange={onChangeHandler}
        inputProps={{ minLength: 2 }}
      />
      <TextField
        name="password"
        required
        label="Password"
        fullWidth
        variant="standard"
        color="warning"
        type="password"
        value={fields.password}
        onChange={onChangeHandler}
      />
      <LoadingButton
        sx={{ borderRadius: "60px", p: "10px 34px", alignSelf: "start" }}
        color="warning"
        type="submit"
        variant="contained"
        onClick={onClickHandler}
        loading={isLoading}
      >
        Ok
      </LoadingButton>
    </>
  );
};

const RegisterContent = (props: LoginContentProps) => {
  const [fields, setFields] = useState({
    login: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFields((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onClickHandler = () => {
    if (!props.formRef?.current?.checkValidity() || isLoading) return;
    setIsLoading(true);
  };

  return (
    <>
      <TextField
        name="login"
        required
        label="Login"
        fullWidth
        variant="standard"
        color="warning"
        type="text"
        value={fields.login}
        onChange={onChangeHandler}
      />
      <TextField
        name="username"
        required
        label="Username"
        fullWidth
        variant="standard"
        color="warning"
        type="text"
        value={fields.username}
        onChange={onChangeHandler}
      />
      <TextField
        name="password"
        required
        label="Password"
        fullWidth
        variant="standard"
        color="warning"
        type="password"
        value={fields.password}
        onChange={onChangeHandler}
      />
      <TextField
        name="confirmPassword"
        required
        label="Confrim password"
        fullWidth
        variant="standard"
        color="warning"
        type="password"
        value={fields.confirmPassword}
        onChange={onChangeHandler}
      />
      <LoadingButton
        sx={{ borderRadius: "60px", p: "10px 34px", alignSelf: "start" }}
        color="warning"
        variant="contained"
        type="submit"
        onClick={onClickHandler}
        loading={isLoading}
      >
        ОК
      </LoadingButton>
    </>
  );
};
