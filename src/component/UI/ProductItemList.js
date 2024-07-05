import React from "react";
import { Link } from "react-router-dom";
function ProductItemList({ productsData }) {
  return (
    <Link
      to={`/detail-page/${productsData.id}`}
      className="hover:drop-shadow-lg productList__header animate__animated animate__bounceInRight flex justify-around py-2 px-2 items-center border-b-[1px] hover:bg-white transition-colors"
    >
      <div className="w-1/12">
        <img
          src={`${
            productsData.images.url
              ? productsData.images.url
              : "https://newhorizon-department-of-computer-science-engineering.s3.ap-south-1.amazonaws.com/nhengineering/department-of-computer-science-engineering/wp-content/uploads/2020/01/13103907/default_image_01.png"
          }`}
          className="max-w-[2rem] rounded-md"
          alt=""
        />
      </div>
      <div className="w-2/12">
        <p className=" text-black m-0 text-left flex item-center">
          {productsData.product_type}
        </p>
      </div>
      <div className="w-3/12 ">
        <p className=" text-black  m-0 text-left flex item-center">
          {productsData.title}
        </p>
      </div>
      <div className="w-4/12 flex">
        {productsData.tags.slice(0, 4).map((tag, index) => {
          return (
            <p
              key={index}
              className="border p-2 bg-white mr-2 truncate ... text-black"
            >
              {tag}
            </p>
          );
        })}
        <p className="px-2 pt-2 opacity-30 text-black bg-white mr-2">...</p>
      </div>
      <div className="w-2/12">
        <p className=" text-black m-0 flex item-center">
          {productsData.vendor}
        </p>
      </div>
    </Link>
  );
}

export default ProductItemList;
