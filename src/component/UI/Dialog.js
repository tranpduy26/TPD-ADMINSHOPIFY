import React from "react";
import { useTranslation } from "react-i18next";
function Dialog({ message, onDialog }) {
  const { t } = useTranslation();
  return (
    <div className="fixed  top-0 left-0 flex justify-center items-center  bottom-0 z-10 right-0 bg-[#00000099]">
      <div
        className={`"dialog animate__animated animate__fadeInUp  flex flex-col mb:w-full  justify-center text-center items-center rounded-[1rem]  bg-white p-4 max-w-md"`}
        style={{ transform: "translate(-50%,-50%) " }}
      >
        <h3 className="text-2xl">{t("comfirm")}</h3>
        <p className="font-light text-[12px] my-4 px-4">{message}</p>
        <div className="flex">
          <button
            onClick={() => {
              onDialog(true);
            }}
            className="p-2 mr-2 text-white bg-black px-4 rounded-[0.5rem] hover:bg-[#808080] transition-colors "
          >
            {t("comfirm")}
          </button>
          <button
            onClick={() => {
              onDialog(false);
            }}
            className="p-2  text-black px-4 rounded-[0.5rem]"
          >
            {t("cancle")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dialog;
