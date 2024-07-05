import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Dropdown from "../component/UI/Dropdown";
import ProductItem from "../component/UI/ProductItem";
import { getProductList, getProductType } from "../store/products/list";
import SkeletonLoading from "../component/UI/SkeletonLoading";
import SearchProduct from "../component/UI/SearchProduct";
import NotData from "./Error/notData";
import { apiService } from "../services/apiService";
import ProductItemList from "../component/UI/ProductItemList";
import { useTranslation } from "react-i18next";
export default function Home() {
  const dispatch = useDispatch();
  const [selectedType, setselectedType] = useState("");
  const [selectedTags, setselectedTags] = useState("");
  const [selectedVendor, setselectedVendor] = useState("");
  const [isMoreTool, setisMoreTool] = useState(false);
  const [isOptionViewCard, setisOptionViewCard] = useState(true);
  const [isOptionViewList, setisOptionViewList] = useState(false);
  const [isOpenFilterSort, setisOpenFilterSort] = useState(false);
  const [isOpenGarbage, setisOpenGarbage] = useState(false);
  const [listProductType, setListProductType] = useState(["..."]);
  const [listProductTags, setListProductTags] = useState(["..."]);
  const [listProductVendors, setListProductVendors] = useState(["..."]);
  const [notData, setNotData] = useState(false);
  const productLists = useSelector(
    (state) => state.products.listProduct.allProduct
  );
  const pageInfor = useSelector(
    (state) => state.products.listProduct.pageInfor
  );
  const isFetching = useSelector(
    (state) => state.products.listProduct.isfetching
  );
  const moreToolActive = () => {
    setisMoreTool((current) => !current);
  };
  const garbageActive = () => {
    setisOpenGarbage((current) => !current);
  };
  const filterSortActive = () => {
    setisOpenFilterSort((current) => !current);
  };
  const handleOpenViewCard = () => {
    setisOptionViewCard(true);
    setisOptionViewList(false);
  };
  const handleOpenViewList = () => {
    setisOptionViewCard(false);
    setisOptionViewList(true);
  };

  const handleSearchTermChange = (keyWordSearch) => {
    setFilter({
      ...filters,
      search: keyWordSearch.searchTerm,
    });
  };

  const [filters, setFilter] = useState({
    search: null,
    type: null,
    tags: null,
    vendor: null,
    before: null,
    after: null,
  });
  const { t } = useTranslation();
  useEffect(() => {
    setFilter((prevState) => ({
      ...prevState,
      type: selectedType === "- (clear...) -" ? null : selectedType,
    }));
  }, [selectedType]);

  useEffect(() => {
    setFilter((prevState) => ({
      ...prevState,
      tags: selectedTags === "- (clear...) -" ? null : selectedTags,
    }));
  }, [selectedTags]);

  useEffect(() => {
    setFilter((prevState) => ({
      ...prevState,
      vendor: selectedVendor === "- (clear...) -" ? null : selectedVendor,
    }));
  }, [selectedVendor]);

  const [pagination, setPagination] = useState({
    prev: false,
    next: true,
  });
  useEffect(() => {
    dispatch(getProductList(filters));
    dispatch(getProductType());
  }, [filters, dispatch]);

  useEffect(() => {
    if (pageInfor != null) {
      setPagination({
        prev: pageInfor.has_previous_page,
        next: pageInfor.has_next_page,
      });
    }
  }, [pageInfor]);

  useEffect(() => {
    if (productLists) {
      if (productLists.length === 0 && !isFetching) {
        setNotData(true);
      } else {
        setNotData(false);
      }
    }
  }, [productLists, isFetching]);

  useEffect(() => {
    async function fetchDataProdcutType() {
      let productTypes = await apiService.getListProductType();
      const types = productTypes.product_types.map((item) => {
        return item.title;
      });
      setListProductType(types);
    }
    async function fetchDataProdcutTags() {
      let productTags = await apiService.getListTags();
      const tags = productTags.tags.map((item) => {
        return item.title;
      });
      setListProductTags(tags);
    }
    async function fetchDataProdcutVendors() {
      let productVendors = await apiService.getListVendors();
      const vendors = productVendors.vendors.map((item) => {
        return item.title;
      });
      setListProductVendors(vendors);
    }
    fetchDataProdcutVendors();
    fetchDataProdcutType();
    fetchDataProdcutTags();
  }, []);
  const handleRenderProduct = () => {
    if (!productLists || isFetching) {
      return <SkeletonLoading />;
    } else {
      return productLists.map((item, index) => {
        return <ProductItem productsData={item} key={index} />;
      });
    }
  };
  const handleRenderProductList = () => {
    if (!productLists || isFetching) {
      return <SkeletonLoading />;
    } else {
      return productLists.map((item, index) => {
        return <ProductItemList productsData={item} key={index} />;
      });
    }
  };
  useEffect(() => {
    if (isFetching) {
      setNotData(false);
    }
  }, [isFetching, notData]);

  const handlePageChange = (prevPage, nextPage) => {
    setFilter({
      ...filters,
      before: prevPage,
      after: nextPage,
    });
  };
  return (
    <div className="mb:col-start-1 sm:col-start-1 lg:col-start-2 col-end-13 px-[1rem] pt-[60px] pb-7">
      <div className="manager text-left" id="manager">
        <div className="flex items-center border py-[0.5rem] mb:flex-wrap">
          <div className="custom-select w-[20rem] mb:w-full">
            <Dropdown
              selected={selectedType}
              setselected={setselectedType}
              content={t("Filter with product type")}
              options={["- (clear...) -", ...listProductType]}
            />
          </div>

          <SearchProduct onSubmit={handleSearchTermChange} />
        </div>
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex flex-wrap">
            <button className="bg-[#e0e0e0] hover:bg-[#F9F86B] mb:w-full transition-colors p-[0.5rem] mt-2 rounded-2">
              + {t("Add Product")}
            </button>
            <div className="p-2 mt-2">
              <button
                onClick={garbageActive}
                className={`p-1 ${
                  isOpenGarbage ? "bg-[#80808087] text-white" : "bg-white"
                } transition-all rounded-[0.5rem]`}
              >
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>

            <div
              className={`flex mb:-order-1 items-center mb:w-full ${
                isMoreTool ? "mb:h-[6rem]" : "mb:h-[0px] overflow-hidden"
              }  mb:mt-2 mb:flex-wrap ${
                isMoreTool ? "w-[20rem]" : " w-[0px]"
              } ease-in duration-300`}
            >
              <div className="py-[5.5px] mt-[8px] sm:mr-2 mb:w-full sm:w-[10rem] border mb:mt-0 ">
                <Dropdown
                  selected={selectedTags}
                  setselected={setselectedTags}
                  content={t("Filter with Tags")}
                  options={["- (clear...) -", ...listProductTags]}
                />
              </div>
              <div className="mt-8px mb:hidden sm:block">-</div>
              <div className="py-[5.5px] mt-[8px] sm:ml-2 mb:w-full sm:w-[10rem] border ">
                <Dropdown
                  selected={selectedVendor}
                  content={t("Filter with Vender")}
                  setselected={setselectedVendor}
                  options={["- (clear...) -", ...listProductVendors]}
                />
              </div>
            </div>
            <button
              onClick={moreToolActive}
              className="filter mt-[8px] p-[8px]"
            >
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
                  d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
                />
              </svg>
            </button>
            <div className="option-view mt-[8px] p-2 px-2 border-l-[1px]">
              <button
                onClick={handleOpenViewCard}
                className={`p-1 ${
                  isOptionViewCard ? "bg-[#80808087]" : "bg-white"
                } transition-all rounded-[0.5rem]`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1"
                  stroke="currentColor"
                  className={`w-6 h-6 ${
                    isOptionViewCard ? "text-white" : "text-black"
                  } transition-all`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
                  />
                </svg>
              </button>
              <button
                onClick={handleOpenViewList}
                className={`p-1 ${
                  isOptionViewList ? "bg-[#80808087]" : "bg-white"
                } transition-all rounded-[0.5rem]`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1"
                  stroke="currentColor"
                  className={`w-6 h-6 ${
                    isOptionViewList ? "text-white" : "text-black"
                  } transition-all`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
                  />
                </svg>
              </button>
            </div>
            <button
              onClick={moreToolActive}
              className=" p-[0.5rem] mt-2 mb:hidden rounded-2"
            >
              {t("More")}...
            </button>
          </div>
          <button
            onClick={filterSortActive}
            className={`p-2 flex items-center border ${
              isOpenFilterSort ? "bg-[#80808087] text-white" : "bg-white"
            } transition-all rounded-[0.2rem] text-[12px]`}
          >
            A
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
              />
            </svg>
            Z
          </button>
        </div>
      </div>

      <div
        className={`productList  ${
          isOptionViewList ? "overflow-auto" : "w-full"
        }  mt-2`}
        id="ProductList"
      >
        <div
          className={`productList__wrapper ${
            isOptionViewList
              ? "min-h-[600px] mb:w-[70rem]"
              : "min-h-[1260px] w-full"
          } overflow-scroll`}
        >
          {isOptionViewCard ? (
            <>
              {notData ? <NotData /> : ""}
              <div className="grid mb:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 py-1 ">
                {handleRenderProduct()}
              </div>
            </>
          ) : (
            <div className="">
              <div className="flex py-3 bg-[#80808087] px-2">
                <div className="w-1/12">
                  <h2 className="font-bold text-left text-white">
                    {t("IMAGE")}
                  </h2>
                </div>
                <div className="w-2/12">
                  <h2 className="font-bold text-left text-white">
                    {t("TYPE PRODUCT")}
                  </h2>
                </div>
                <div className="w-3/12">
                  <h2 className=" font-bold text-left text-white">
                    {t("TITLE")}
                  </h2>
                </div>
                <div className="w-4/12">
                  <h2 className="font-bold flex items-center text-left text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5 mr-2"
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
                    </svg>{" "}
                    {t("TAGS")}
                  </h2>
                </div>
                <div className="w-2/12">
                  <h2 className="font-bold text-left text-white">
                    {t("VENDOR")}
                  </h2>
                </div>
              </div>
              {notData ? <NotData /> : ""}
              <div className="">{handleRenderProductList()}</div>
            </div>
          )}
        </div>
        <div className="flex justify-between p-2">
          <div className="flex justify-center items-center">
            <button
              disabled={!pagination.prev}
              onClick={() => {
                handlePageChange(pageInfor.previous_page_cursor, null);
              }}
              className="disabled:opacity-30 disabled:cursor-not-allowed border p-2 hover:bg-[#e0e0e0] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="disabled:opacity-50 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              disabled={!pagination.next}
              onClick={() => {
                handlePageChange(null, pageInfor.next_page_cursor);
              }}
              className="disabled:opacity-50 border p-2 hover:bg-[#e0e0e0] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="disabled:opacity-50 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
