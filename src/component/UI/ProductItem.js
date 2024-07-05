import React from "react";
import "animate.css";
import { Link } from "react-router-dom";
function ProductItem({ productsData }) {
  return (
    <Link
      to={`/detail-page/${productsData.id}`}
      className="animate__animated  animate__bounceInRight rounded-[1rem] border bg-white hover:border-black  p-3 transition cursor-pointer"
    >
      <img
        src={`${
          productsData.images.url
            ? productsData.images.url
            : "https://newhorizon-department-of-computer-science-engineering.s3.ap-south-1.amazonaws.com/nhengineering/department-of-computer-science-engineering/wp-content/uploads/2020/01/13103907/default_image_01.png"
        }`}
        alt=""
        className="w-full object-cover object-center min-h-[26rem]"
      />
      <div className="item__content text-black ">
        <h3 className="mb-1 mt-2 text-left font-bold">{productsData.title}</h3>
        <p className="mb-1 text-left">
          <span className="font-bold">Type:</span> {productsData.product_type}
        </p>
        <p className="mb-1 text-left">
          <span className="font-bold">Vendor:</span> {productsData.vendor}
        </p>
      </div>
    </Link>
  );
}

export default ProductItem;
