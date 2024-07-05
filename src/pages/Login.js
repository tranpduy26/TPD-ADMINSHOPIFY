import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { initialLogin } from "../utils/utils";
import { Link } from "react-router-dom";
import Spinner from "../component/UI/Spinner";
import { loginUser } from "../store/auth/authSlice";
import "../style/login-page.scss";
import DropdownLanguages from "../component/UI/DropdownLanguages";
import { useTranslation } from "react-i18next";
export default function Login() {
  const [user, setuser] = useState(initialLogin);
  const [showPassWord, setshowPassWord] = useState(false);
  const isfetching = useSelector((state) => state.auth.isfetching);
  const notice = useSelector((state) => state.auth.message);

  const dispatch = useDispatch();
  const handleChangeAccount = (event) => {
    let value = event.target.value;
    let key = event.target.name;
    let cloneUser = { ...user, [key]: value };
    setuser(cloneUser);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(user));
  };
  const handleShowPassWord = () => {
    setshowPassWord((current) => !current);
  };
  const { t } = useTranslation();
  return (
    <div
      className="bg-red w-full mb:h-full sm:h-screen mb:relative sm:fixed xl:relative"
      id="login"
    >
      {isfetching ? <Spinner /> : ""}
      <div className="background absolute"></div>

      <div className="login__container absolute mb:transform-none bg-white mb:max-w-none w-full md:max-w-[600px] lg:max-w-[600px] mb:pb-24 mb:left-0 sm:top-2/4 sm:left-2/4 p-8">
        <div className="absolute top-4 right-[32px]">
          <DropdownLanguages />
        </div>
        <div className="align-center mb-4">
          <h1>{t("LOGIN")}</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente
            sequi necessitatibus nobis reiciendis cupiditate quia voluptates
            magni repellat facilis dolorem?
          </p>
        </div>
        <form
          action=""
          className="login-form"
          onSubmit={(e) => {
            handleLogin(e);
          }}
        >
          <div className="form-group">
            <input
              type="text"
              name="email"
              value={user.email}
              className="account form-control w-full"
              placeholder={t("Email/Phone number")}
              aria-describedby="helpId"
              onChange={(e) => {
                handleChangeAccount(e);
              }}
            />
          </div>
          <div className="form-group flex w-full py-[5px] px-[20px] rounded-[1rem] border border-[#d9d9d9] h-[40px]">
            <input
              type={showPassWord ? "text" : "password"}
              name="password"
              value={user.password}
              className="password w-full"
              placeholder={t("Password")}
              aria-describedby="helpId"
              onChange={(e) => {
                handleChangeAccount(e);
              }}
            ></input>
            <button
              className="opacity-40"
              type="button"
              onClick={handleShowPassWord}
            >
              {showPassWord ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              )}
            </button>
          </div>
          <small
            id="helpId"
            className="inline-block w-full text-left text-muted text-red-500"
          >
            {notice}
          </small>
          <button type="submit" className="btn-login">
            {t("Login")}
          </button>
          <div className="or-divider pt-4">
            <span>{t("Or")}</span>
          </div>
          <button className="btn-facebook">
            {t("Sign in with Facebook")}
            <i className="ml-2 fa-brands fa-square-facebook"></i>
          </button>
          <button className="btn-google">
            {t("Sign in with Google")}
            <i className="ml-2 fa-brands fa-google"></i>
          </button>
          <div className="flex justify-between mt-4 text-[#2f5acf]">
            <Link to="/Register">{t("Register a new account")}</Link>
            <Link to="/Register">{t("Forget password")}</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
