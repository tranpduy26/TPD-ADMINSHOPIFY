import React from "react";

function SkeletonLoadingDetail() {
  return (
    <div className="w-full sm:flex h-[80vh] ">
      <div
        className=" flex detail__img border-r-[1px] border-[gray] mb:w-full sm:w-2/4 h-full sm:mr-2 "
        style={{}}
      >
        <div className="mb:w-full sm:w-4/5 skeleton">
          <img className="w-full h-full object-cover" alt="" />
        </div>
        <div className="w-1/5 mb:hidden sm:flex flex-col justify-center items-center">
          <div className="skeleton border rounded w-12 cursor-pointer hover:bg-[gray] mt-2 h-12 flex justify-center items-center text-xl "></div>
          <div className="skeleton border rounded w-12 cursor-pointer hover:bg-[gray] mt-2 h-12 flex justify-center items-center text-xl "></div>
          <div className="skeleton border rounded w-12 cursor-pointer hover:bg-[gray] mt-2 h-12 flex justify-center items-center text-xl "></div>
        </div>
      </div>
      <div className="w-full mb:flex sm:hidden justify-center items-center border-b-2 pb-2">
        <div className="skeleton border rounded w-12 mr-2 cursor-pointer hover:bg-[gray] mt-2 h-12 flex justify-center items-center text-xl "></div>
        <div className="skeleton border rounded w-12 mr-2 cursor-pointer hover:bg-[gray] mt-2 h-12 flex justify-center items-center text-xl "></div>
        <div className="skeleton border rounded w-12 mr-2 cursor-pointer hover:bg-[gray] mt-2 h-12 flex justify-center items-center text-xl "></div>
      </div>
      <div className=" mb:w-full sm:w-2/4 h-full sm:ml-2 mb:mt-4">
        <div className="border-b text-left pb-3">
          <div className="flex items-center"></div>
        </div>
        <div className="text-left">
          <div className="pb-2">
            <p className="text-left mb-0 mt-2 skeleton skeleton-text"></p>
            <div className="text-left flex items-center flex-wrap "></div>
            <div className="mt-4">
              <span className="flex skeleton skeleton-text w-[10rem] mb-2"></span>
              <div className="flex">
                <div className="flex skeleton w-[5rem] h-[2rem] rounded-[0.2rem] mr-2"></div>
                <div className="flex skeleton w-[5rem] h-[2rem] rounded-[0.2rem] mr-2"></div>
                <div className="flex skeleton w-[5rem] h-[2rem] rounded-[0.2rem] mr-2"></div>
              </div>
            </div>

            <div className="mt-4 border-b pb-[0.25rem] ">
              <button className="mb-2 flex justify-between hover:bg-[gray] transition-colors w-full hover:text-white">
                <span className="flex skeleton skeleton-text w-[10rem]"></span>
                <span className="flex skeleton skeleton-text w-[4rem]"></span>
              </button>
              <form action="">
                <span className="flex skeleton skeleton-text w-[10rem]"></span>
                <button className="skeleton h-[3rem] btn-updateTitle bg-black w-full text-white rounded-[0.5rem] mt-4 text-[16px] p-2"></button>
                <span className="mt-2 flex skeleton skeleton-text w-[10rem]"></span>
                <button className="skeleton h-[3rem] btn-updateTitle bg-black w-full text-white rounded-[0.5rem] mt-4 text-[16px] p-2"></button>

                <button className="skeleton h-[3rem] btn-updateTitle bg-black w-full text-white rounded-[0.5rem] mt-4 text-[16px] p-2"></button>
              </form>
            </div>
          </div>
        </div>

        <div className="text-left mt-4">
          <h2 className="skeleton skeleton-text mb-2 w-[10rem]"></h2>
          <p className="text-left text-[12px] skeleton skeleton-text"></p>
          <p className="text-left text-[12px] skeleton skeleton-text mt-2"></p>
          <p className="text-left text-[12px] skeleton skeleton-text mt-2"></p>
          <p className="text-left text-[12px] skeleton skeleton-text mt-2"></p>
        </div>
      </div>
    </div>
  );
}

export default SkeletonLoadingDetail;
