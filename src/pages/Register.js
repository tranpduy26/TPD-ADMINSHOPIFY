import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { initialRegister } from "../utils/utils";
import { Link } from "react-router-dom";
import isEmpty from "validator/lib/isEmpty";
import { validate } from "../utils/validation";
import Spinner from "../component/UI/Spinner";
import { registerUser } from "../store/auth/authSlice";
import "../style/register.scss";
import DropdownLanguages from "../component/UI/DropdownLanguages";
import { useTranslation } from "react-i18next";
function Register() {
  const { t } = useTranslation();
  const [user, setuser] = useState(initialRegister);
  const [validationMsg, setvalidationMsg] = useState("");
  const isFetching = useSelector((state) => state.auth.isfetching);
  const dispatch = useDispatch();
  const [showPassWord, setshowPassWord] = useState(false);
  const handleChangeAccount = (event) => {
    let value = event.target.value;
    let key = event.target.name;
    let cloneUser = { ...user, [key]: value };
    setuser(cloneUser);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const isValid = validateAll();
    if (isValid) {
      dispatch(registerUser(user));
    }
  };
  const handleShowPassWord = () => {
    setshowPassWord((current) => !current);
  };
  const validateAll = () => {
    const msg = {};

    // validate email
    if (!isEmpty(user.email)) {
      if (!validate.isEmail(user.email)) {
        msg.email = t("Evalid email");
      }
    } else {
      msg.email = t("Please input your email");
    }

    // validate name
    if (!isEmpty(user.name)) {
      if (!validate.isCharactor(user.name)) {
        msg.name = t("Name is charactor");
      }
    } else {
      msg.name = t("Please input your name");
    }

    // validate password
    if (!isEmpty(user.password)) {
      if (!validate.isLength(user.password, 6, 18)) {
        msg.password = t("password have 6 to 18 charactor");
      }
    } else {
      msg.password = t("Please input your password");
    }

    //validate confirm password
    if (!isEmpty(user.passwordConfirm)) {
      if (user.passwordConfirm !== user.password) {
        msg.passwordConfirm = t("Password incorrect!");
      }
    } else {
      msg.passwordConfirm = t("Please input your confirm password");
    }
    setvalidationMsg(msg);
    if (Object.keys(msg).length > 0) {
      return false;
    }
    return true;
  };
  return (
    <div
      className="bg-red w-full mb:h-full sm:h-screen mb:relative sm:fixed xl:relative"
      id="register"
    >
      {isFetching ? <Spinner /> : ""}
      <span>{isFetching}</span>
      <div className="background absolute"></div>

      <div className="register__container absolute mb:transform-none bg-white mb:max-w-none w-full md:max-w-[600px] lg:max-w-[600px] mb:pb-24 mb:left-0 sm:top-2/4 sm:left-2/4 p-8">
        <div className="absolute top-4 right-[32px]">
          <DropdownLanguages />
        </div>
        <div className="align-center mb-4">
          <h1>{t("Register")}</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente
            sequi necessitatibus nobis reiciendis cupiditate quia voluptates
            magni repellat facilis dolorem?
          </p>
        </div>
        <form
          action=""
          className="register-form"
          onSubmit={(e) => {
            handleRegister(e);
          }}
        >
          <div className="form-group">
            <input
              type="text"
              name="name"
              value={user.name}
              className="form-control"
              placeholder={t("Name")}
              aria-describedby="helpId"
              onChange={(e) => {
                handleChangeAccount(e);
              }}
            />
            <small id="helpId" className="text-muted text-red-500">
              {t(validationMsg.name)}
            </small>
          </div>

          <div className="form-group">
            <input
              type="text"
              name="email"
              value={user.email}
              className="form-control"
              placeholder="Email"
              aria-describedby="helpId"
              onChange={(e) => {
                handleChangeAccount(e);
              }}
            />
            <small id="helpId" className="text-muted text-red-500">
              {t(validationMsg.email)}
            </small>
          </div>
          <div className="flex w-full py-[5px] px-[20px] rounded-[1rem] border border-[#d9d9d9] h-[40px]">
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
            className="text-muted text-red-500 mb-[16px] inline-block ml-[20px] text-left w-full"
          >
            {t(validationMsg.password)}
          </small>
          <div className="form-group">
            <input
              type="password"
              name="passwordConfirm"
              value={user.passwordConfirm}
              className="form-control"
              placeholder={t("confirm password")}
              aria-describedby="helpId"
              onChange={(e) => {
                handleChangeAccount(e);
              }}
            />
            <small id="helpId" className="text-muted text-red-500">
              {t(validationMsg.passwordConfirm)}
            </small>
          </div>
          <button type="submit" className="btn-register">
            {t("register")}
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
          <div className="mt-4 text-ce text-[#2f5acf]">
            <Link to="/Login">{t("Login")}</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
