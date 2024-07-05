import React from "react";
import { Link } from "react-router-dom";
import "../../style/404.scss";
import { useTranslation } from "react-i18next";
function Error() {
  const { t } = useTranslation();
  return (
    <div className="">
      <div className="center h-screen">
        <div className="error flex flex-wrap justify-center items-center">
          <div className="number">4</div>
          <div className="illustration h-[240px]">
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
          <div className="number">4</div>
        </div>
        <div className="text mt-10">
          {t("Oops. The page you're looking for doesn't exist.")}
        </div>
        <Link
          to="/product-page"
          className=" mt-10 border rounded-[0.2rem] hover:border-[gray] hover:text-black border-black p-2"
        >
          {t("Back Home")}
        </Link>
      </div>
    </div>
  );
}

export default Error;
