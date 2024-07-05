import React from "react";
import { useTranslation } from "react-i18next";
function NotData() {
  const { t } = useTranslation();
  return (
    <div className="center">
      <div className="error flex flex-wrap justify-center items-center">
        <div className="text-not-found font-black sm:text-[12rem] mb:text-[5rem]">
          {t("NOT")}
        </div>
        <div className="illustration mb:hidden h-[240px]">
          <div className="circle" />
          <div className="clip">
            <div className="paper">
              <div className="face">
                <div className="eyes">
                  <div className="eye eye-left" />
                  <div className="eye eye-right" />
                </div>
                <div className="rosyCheeks rosyCheeks-left" />
                <div className="rosyCheeks rosyCheeks-right" />
                <div className="mouth" />
              </div>
            </div>
          </div>
        </div>
        <div className="text-not-found font-black sm:text-[12rem] mb:text-[5rem]">
          {t("FOUND")}
        </div>
      </div>
    </div>
  );
}

export default NotData;
