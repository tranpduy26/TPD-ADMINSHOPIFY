import React, { useState, useRef } from "react";
import PropTypes from "prop-types";

import { useTranslation } from "react-i18next";
SearchProduct.prototype = {
  onSubmit: PropTypes.func,
};

SearchProduct.dedaultProps = {
  onSubmit: null,
};

function SearchProduct(props) {
  const { t } = useTranslation();
  const { onSubmit } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const typingSearchRef = useRef(null);
  const handleSearchTermChange = (e) => {
    const values = e.target.value;
    setSearchTerm(values);

    if (!onSubmit) return;

    if (typingSearchRef.current) {
      clearTimeout(typingSearchRef.current);
    }

    typingSearchRef.current = setTimeout(() => {
      const formValues = {
        searchTerm: values,
      };
      onSubmit(formValues);
    }, 300);
  };
  return (
    <div className="px-2 flex w-full mb:mt-2 mb:border-t-[#e2e2e2] mb:border-t-[1px] mb:pt-2">
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
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchTermChange}
        className="pl-2 w-full"
        placeholder={t("Search with your name product")}
      />
    </div>
  );
}

export default SearchProduct;
