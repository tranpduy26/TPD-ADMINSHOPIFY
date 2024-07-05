import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import Spinner from "../../component/UI/Spinner";
import { logoutUser } from "../../store/auth/authSlice";
import logo from "../../img/logo.png";
import DropdownLanguages from "../UI/DropdownLanguages";
import { useTranslation } from "react-i18next";
export default function RootLayout() {
  const [isOpenSidebar, setisOpenSidebar] = useState(false);
  const [isOpenMenuProfile, setisOpenMenuProfile] = useState(false);
  const [isOpenSidebarMb, setisOpenSidebarMb] = useState(false);
  const isfetching = useSelector((state) => state.auth.isfetching);

  const dispatch = useDispatch();
  const handleSidebar = () => {
    setisOpenSidebar((current) => !current);
  };
  const handleSidebarMobile = () => {
    setisOpenSidebarMb((current) => !current);
  };
  const handleMenuProfile = () => {
    setisOpenMenuProfile((current) => !current);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };
  const { t } = useTranslation();
  return (
    <div className="relative">
      {isfetching ? <Spinner /> : ""}
      <div className="background absolute"></div>
      <div
        className={
          isOpenSidebar
            ? "sidebar mb:max-w-[55px] mb:bg-white flex flex-col justify-between active"
            : "sidebar mb:max-w-[55px] mb:bg-white overflow-hidden flex flex-col justify-between"
        }
      >
        <div className="flex flex-col">
          <div className="logo-detail">
            <img src={logo} alt="" />
          </div>
          <ul className="nav-links">
            <li className="nav-links-item">
              <Link to="/product-page" className="nav-links-content">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span className="link-name">{t("Home")}</span>
              </Link>
            </li>
            <li className="nav-links-item">
              <Link to="/detail-page" className="nav-links-content">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>

                <span className="link-name">{t("List Sale")}</span>
              </Link>
            </li>
            <li className="nav-links-item">
              <Link to="/detail-page" className="nav-links-content">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 6h.008v.008H6V6z"
                  />
                </svg>

                <span className="link-name">{t("Tag Manager")}</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col">
          <ul className="nav-lins-bottom nav-links">
            <li className="nav-links-item">
              <Link to="/product-page" className="nav-links-content">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                  />
                </svg>

                <span className="link-name">{t("Contact")}</span>
              </Link>
            </li>
            <li className="nav-links-item">
              <Link to="/detail-page" className="nav-links-content">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>

                <span className="link-name">{t("Setting")}</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="home-section mb:left-[55px] ">
        <nav className="mb:left-[55px] 2xl:my-0 transition-colors white flex pr-[16px] items-center justify-between flex-wrap py-2 pl-0 my-0 ">
          <div className="flex justify-between ">
            <button
              className="flex items-center mb:hidden sm:hidden md:block text-14 rounded text-black hover:text-[gray] hover:border-white mr-4"
              onClick={handleSidebar}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-[35px] w-[60px]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </button>
            <button
              className="flex items-center mb:block sm:block md:hidden text-14 rounded text-black hover:text-[gray] hover:border-white mr-4"
              onClick={handleSidebarMobile}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-[35px] w-[60px]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </button>
          </div>
          <div className="flex header__action items-center">
            <button
              className={
                isOpenMenuProfile
                  ? "header__action--profile mx-2 active"
                  : "header__action--profile mx-2"
              }
              onClick={handleMenuProfile}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1"
                stroke="currentColor"
                className="h-[2rem] w-[2rem] text-black hover:text-[gray]  transition duration-150 ease-out hover:ease-in"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>

              <ul className="header__navbar-user-menu absolute bg-white z-10">
                <li className="header__navbar-user-name">Name user</li>
                <p className="btn__header__navbar-user-menu">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </p>
                <div className="bg__header__navbar-user-menu"></div>
                <li className="header__navbar-user-item flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>

                  <Link to="/Profile" className="ml-2 text-2md">
                    {t("MY ACCOUNT")}
                  </Link>
                </li>

                <li className="header__navbar-user-item flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>

                  <p className="ml-2 text-2md mb-0" onClick={handleLogout}>
                    {t("LOGOUT")}
                  </p>
                </li>
              </ul>
            </button>
            <DropdownLanguages />
          </div>
          <div
            className={
              isOpenSidebarMb
                ? "sidebar-mobile active z-10 mb:flex sm:hidden flex-col justify-between"
                : "sidebar-mobile z-10 mb:block sm:hidden flex justify-between"
            }
          >
            <div className="flex flex-col">
              <div className="logo-detail flex justify-between">
                <img src={logo} alt="" />
                <button
                  className="flex items-center text-14 rounded text-black hover:text-[gray] hover:border-white"
                  onClick={handleSidebarMobile}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-[35px] w-[60px]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h7"
                    />
                  </svg>
                </button>
              </div>
              <ul className="nav-links">
                <li className="nav-links-item">
                  <Link to="/product-page" className="nav-links-content">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    <span className="link-name">{t("Home")}</span>
                  </Link>
                </li>
                <li className="nav-links-item">
                  <Link to="/detail-page" className="nav-links-content">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                      />
                    </svg>

                    <span className="link-name">List Sale</span>
                  </Link>
                </li>
                <li className="nav-links-item">
                  <Link to="/detail-page" className=" nav-links-content">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 6h.008v.008H6V6z"
                      />
                    </svg>

                    <span className="link-name">{t("Tag Manager")}</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col">
              <ul className="nav-lins-bottom nav-links">
                <li className="nav-links-item">
                  <Link to="/product-page" className=" nav-links-content">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                      />
                    </svg>
                    <span className="link-name">{t("Contact")}</span>
                  </Link>
                </li>
                <li className="nav-links-item">
                  <Link to="/detail-page" className=" nav-links-content">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="link-name">{t("Setting")}</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div
            onClick={handleSidebarMobile}
            className={
              isOpenSidebarMb
                ? "absolute h-screen w-screen left-0 top-0 bg-[#0000008c] mb:block sm:hidden"
                : "hidden absolute h-screen w-screen left-0 top-0 bg-[#0000008c] mb:hidden sm:hidden"
            }
          ></div>
        </nav>
        <Outlet />
      </div>
      <div
        onClick={handleMenuProfile}
        className={
          isOpenMenuProfile ? "absolute h-screen w-screen left-0 top-0" : ""
        }
      ></div>
    </div>
  );
}
