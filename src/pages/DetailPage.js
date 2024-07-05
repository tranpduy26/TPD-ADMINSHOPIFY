import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Dialog from "../component/UI/Dialog";
import Multipleddl from "../component/UI/Multipleddl";
import SkeletonLoadingDetail from "../component/UI/SkeletonLoadingDetail";
import "../style/detail-page.scss";
import { apiService } from "../services/apiService";
import { useTranslation } from "react-i18next";
import {
  addTags,
  getDetailProduct,
  handleTitleClick,
  removeTagsPorudct,
  updatePriceProductWithAmount,
  updatePriceProductWithPercent,
  updateTitleProduct,
} from "../store/products/detail";
import { getProductList } from "../store/products/list";

function DetailPage() {
  const { t } = useTranslation();
  const { productDetail, isfetching, price, activeTitle } = useSelector(
    (state) => state.products.detailProduct
  );
  const productLists = useSelector(
    (state) => state.products.listProduct.allProduct
  );
  const [selectedDetail, setSelectedDetail] = useState({
    images: {
      url: "./image.png",
    },
  });

  const [nameTitle, setNameTitle] = useState();
  const [updatePriceWithPercent, setUpdatePriceWithPercent] = useState(false);
  const [updatePriceWithMount, setUpdatePriceWithMount] = useState(false);
  const [updateTitle, setUpdateTitle] = useState(false);
  const [isOpenAddTag, setisOpenAddTag] = useState(false);
  const [isOpenRemoveTag, setisOpenRemoveTag] = useState(true);
  const [showPrice, setShowPrice] = useState(price);
  const [tagItem, setTagItem] = useState([]);
  const [tagsChecked, settagsChecked] = useState([]);
  const { productID } = useParams();
  const dispatch = useDispatch();
  const [inputTitle, setInputTitle] = useState({
    productTitle: "new title",
    price: "1",
  });
  useEffect(() => {
    if (tagsChecked.length >= 1) {
      setisOpenRemoveTag(false);
    } else if (tagsChecked.length === 0) {
      setisOpenRemoveTag(true);
    }
  }, [tagsChecked]);
  useEffect(() => {
    if (productDetail) {
      setTagItem(productDetail.tags);
    }
  }, [productDetail]);

  const [inputUpdatePricePercent, setInputUpdatePricePercent] = useState({
    variantId: "",
    currentPrice: "",
    percent: "",
    isIncrease: "",
  });

  const [inputUpdatePriceAmount, setInputUpdatePriceAmount] = useState({
    variantId: "",
    currentPrice: "",
    amount: "",
    isIncrease: "",
  });
  const [inputTagsChecked, setInputTagsChecked] = useState({
    id: "",
    tag: "",
  });
  const [selectOptionTags, setselectOptionTags] = useState([]);
  const [listAddTags, setListAddTags] = useState({
    id: "",
    tag: "",
  });
  useEffect(() => {
    const valueSelectOptions = selectOptionTags.map((select) => {
      return select.value;
    });
    setListAddTags({
      id: productID,
      tag: valueSelectOptions,
    });
  }, [selectOptionTags, productID]);

  useEffect(() => {
    if (productDetail) {
      setInputTagsChecked({
        id: productDetail.id,
        tag: tagsChecked,
      });
    }
  }, [productDetail, tagsChecked]);

  const handleCheckTag = (event) => {
    var updatedList = [...tagsChecked];
    if (event.target.checked) {
      updatedList = [...tagsChecked, event.target.value];
    } else {
      updatedList.splice(tagsChecked.indexOf(event.target.value), 1);
    }
    settagsChecked(updatedList);
  };

  const handleIsUpdateTitle = () => {
    setUpdateTitle((current) => !current);
  };
  const handleIsUpdatePriceWithMount = () => {
    setUpdatePriceWithMount((current) => !current);
  };
  const handleIsUpdatePriceWithPercent = () => {
    setUpdatePriceWithPercent((current) => !current);
  };

  const handleRenderTitle = () => {
    if (!productDetail) {
      return;
    }
    return productDetail.variants.map((variant, index) => {
      return (
        <button
          onClick={() => {
            handleGetPrice(variant.id, variant.price);
          }}
          key={index}
          className={
            activeTitle === variant.id
              ? "border mr-2 text-white mt-2 border-white bg-black p-2"
              : "border mr-2 mt-2 border-black text black bg-white p-2 hover:bg-black hover:border-white hover:text-white transition-colors"
          }
        >
          {variant.title}
        </button>
      );
    });
  };

  const handleSubmitUpdateTitle = (title) => {
    dispatch(updateTitleProduct({ productID, title }));
  };

  const handleSubmitUpdateAmount = (info) => {
    dispatch(updatePriceProductWithAmount({ info }));
  };

  const handleSubmitUpdatePercent = (info) => {
    dispatch(updatePriceProductWithPercent({ info }));
  };
  const handleSubmitAddTags = (listTags) => {
    const newTagItem = [...tagItem, ...listTags.tag];
    setTagItem(newTagItem);
    dispatch(addTags(listTags));
  };
  const handleUpdateTitileChange = (event) => {
    let value = event.target.value;
    let key = event.target.name;
    let cloneUInput = { ...inputTitle, [key]: value };
    setInputTitle(cloneUInput);
  };
  const handleUpdateAmountChange = (event) => {
    let value = event.target.value;
    let key = event.target.name;
    let cloneUInput = { ...inputUpdatePriceAmount, [key]: value };
    setInputUpdatePriceAmount(cloneUInput);
  };
  const handleUpdatePercentChange = (event) => {
    let value = event.target.value;
    let key = event.target.name;
    let cloneUInput = { ...inputUpdatePricePercent, [key]: value };
    setInputUpdatePricePercent(cloneUInput);
  };

  const handleRenderTag = () => {
    if (productDetail) {
      return tagItem.map((tag, index) => {
        return (
          <div key={index} className="tag-item ">
            <label className="cursor-pointer">
              <input value={tag} onChange={handleCheckTag} type="checkbox" />
              <span className="tag-content mt-2 mb-0 border-black relative rounded-[4px]text-left border mr-[4px] p-2 inline-block">
                {tag}
              </span>
            </label>
          </div>
        );
      });
    }
  };
  const handleIsOpenAddTags = () => {
    setisOpenAddTag((current) => !current);
  };
  const [listProductTags, setListProductTags] = useState("");
  useEffect(() => {
    async function fetchDataProdcutTags() {
      let productTags = await apiService.getListTags();
      const tags = productTags.tags.map((item) => {
        return item.title;
      });
      setListProductTags(tags);
    }
    fetchDataProdcutTags();
  }, []);

  const handleConfirmRemoveTag = () => {
    handleDialog(t("Are you sure want Delete tag ?"), true);
  };

  const areUSureDelete = (choose) => {
    if (choose) {
      dispatch(removeTagsPorudct(inputTagsChecked));
      setisOpenRemoveTag(true);
      const newTagItem = tagItem.filter(
        (element) => !tagsChecked.includes(element)
      );
      setTagItem(newTagItem);
      handleDialog("", false);
    } else {
      handleDialog("", false);
    }
  };

  const [dialog, setDialog] = useState({
    message: "",
    isOpen: false,
  });
  const handleDialog = (message, isOpen) => {
    setDialog({
      message,
      isOpen,
    });
  };

  const handleGetPrice = (id) => {
    productDetail.variants.forEach((variant) => {
      if (variant.id === id) {
        dispatch(
          handleTitleClick({
            price: variant.price,
            id: variant.id,
          })
        );
        setShowPrice(price);
      }
    });
  };

  useEffect(() => {
    dispatch(getProductList(""));
  }, [dispatch]);
  useEffect(() => {
    if (productLists !== null) {
      var selectedDetail = productLists.find((selected) => {
        return selected.id === productID;
      });
      if (selectedDetail != null) {
        setSelectedDetail(selectedDetail);
      }
    }
    if (productDetail) {
      setNameTitle(productDetail.title);
    }
  }, [productLists, productID, productDetail]);

  useEffect(() => {
    dispatch(getDetailProduct(productID));
  }, [dispatch, productID]);
  useEffect(() => {
    if (!productDetail) return;
    const handleSetFilter = () => {
      setInputTitle({
        productTitle: productDetail.title,
        price: { [activeTitle]: price },
      });

      if (productDetail) {
        setNameTitle(productDetail.title);
      }
    };
    handleSetFilter();
  }, [productDetail, price, activeTitle]);

  useEffect(() => {
    setInputUpdatePriceAmount((prevState) => ({
      ...prevState,
      variantId: activeTitle,
      currentPrice: price,
    }));
    setInputUpdatePricePercent((prevState) => ({
      ...prevState,
      variantId: activeTitle,
      currentPrice: price,
    }));
  }, [price, activeTitle]);

  useEffect(() => {
    setShowPrice(price);
  }, [price]);

  return (
    <div className="mb:col-start-1  sm:col-start-1 lg:col-start-3 col-end-13 py-[60px] px-[25px]">
      {isfetching ? (
        <SkeletonLoadingDetail />
      ) : (
        <>
          <Link
            to="/product-page"
            className="flex items-center text-left mb-4 text-black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            {t("BACK")}
          </Link>
          <div className="w-full sm:flex h-[80vh] ">
            <div
              className=" flex detail__img border-r-[1px] border-[gray] mb:w-full sm:w-2/4 h-full sm:mr-2 "
              style={{}}
            >
              <div className="mb:w-full sm:w-4/5">
                <img
                  alt=""
                  src={`${
                    selectedDetail.images.url
                      ? selectedDetail.images.url
                      : "https://newhorizon-department-of-computer-science-engineering.s3.ap-south-1.amazonaws.com/nhengineering/department-of-computer-science-engineering/wp-content/uploads/2020/01/13103907/default_image_01.png"
                  }`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-1/5 mb:hidden sm:flex flex-col justify-center items-center">
                <div className="border-black border rounded w-12 cursor-pointer hover:bg-[gray] mt-2 h-12 flex justify-center items-center text-xl ">
                  1
                </div>
                <div className="border-black border rounded w-12 cursor-pointer hover:bg-[gray] mt-2 h-12 flex justify-center items-center text-xl ">
                  2
                </div>
                <div className="border-black border rounded w-12 cursor-pointer hover:bg-[gray] mt-2 h-12 flex justify-center items-center text-xl ">
                  3
                </div>
              </div>
            </div>
            <div className="w-full mb:flex sm:hidden justify-center items-center border-b-2 pb-2">
              <div className="border-black border rounded w-12 cursor-pointer hover:bg-[gray] mt-2 h-12 flex justify-center items-center text-xl ">
                1
              </div>
              <div className="border-black border rounded mx-2 w-12 cursor-pointer hover:bg-[gray] mt-2 h-12 flex justify-center items-center text-xl ">
                2
              </div>
              <div className="border-black border rounded w-12 cursor-pointer hover:bg-[gray] mt-2 h-12 flex justify-center items-center text-xl ">
                3
              </div>
            </div>
            <div className=" mb:w-full sm:w-2/4 h-full sm:ml-2 mb:mt-4">
              <div className="border-b text-left pb-3">
                <div className="flex items-center">
                  <h2 className="mb-0 mr-2 text-left text-2xl ">
                    ${showPrice}
                  </h2>
                </div>
              </div>
              <div className="text-left">
                <h2 className="text-2xl mt-2 text-left">{nameTitle}</h2>

                <div className="pb-2">
                  <p className="text-left mb-0 mt-2">Tag:</p>
                  <div className="text-left flex items-center flex-wrap ">
                    {handleRenderTag()}
                    <div className="flex items-center">
                      <button
                        onClick={handleIsOpenAddTags}
                        className="plus-btn mt-2 p-[10px] border rounded bg-[#b7b7b7] mr-1"
                      >
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
                            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </button>
                      <button
                        disabled={isOpenRemoveTag}
                        onClick={handleConfirmRemoveTag}
                        className="minus plus-btn disabled:opacity-20 mt-2 p-[10px] border border-black rounded-[0.3rem]"
                      >
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
                            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div
                    className={`"w-full mt-2 flex-wrap ${
                      isOpenAddTag ? "" : "hidden"
                    } flex mt-[1rem]"`}
                  >
                    <Multipleddl
                      options={listProductTags}
                      hasTag={tagItem}
                      setselectOptionTags={setselectOptionTags}
                    />
                    <button
                      onClick={() => {
                        handleSubmitAddTags(listAddTags);
                      }}
                      className="w-full mt-2 text-white mb:p-[0.5rem] p-2 text-sm bg-black"
                    >
                      Add tag
                    </button>
                  </div>
                  <div className="mt-4">
                    <p className="text-left mb-0 mr-2 w-full">{t("Title")}:</p>
                    {handleRenderTitle()}
                  </div>
                  <div className="mt-4 border-b pb-[0.25rem] ">
                    <div
                      onClick={handleIsUpdateTitle}
                      className=" p-2 flex justify-between hover:bg-[gray] transition-colors hover:text-white"
                    >
                      <span className="flex text-left">
                        {t("Update New Title")}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </div>
                    <div
                      action=""
                      className={
                        updateTitle
                          ? "form-detail transition-all updateTitle mt-2 active"
                          : "form-detail updateTitle mt-2"
                      }
                    >
                      <span className="text-left ml-[7px] mb-0 mt-[2rem]">
                        {t("Title")}:
                      </span>
                      <input
                        className="text-left w-full mt  border rounded mb-2  p-[0.5rem]"
                        type="text"
                        name="productTitle"
                        value={inputTitle.productTitle}
                        onChange={(e) => {
                          handleUpdateTitileChange(e);
                        }}
                        placeholder="Update new title"
                      />

                      <button
                        onClick={() => {
                          handleSubmitUpdateTitle(inputTitle);
                        }}
                        className="btn-updateTitle bg-black w-full text-white rounded-[0.5rem] mt-4 text-[16px] p-2"
                      >
                        {t("UPDATE")}
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 border-b pb-[0.25rem] w-full ">
                    <button
                      onClick={handleIsUpdatePriceWithMount}
                      className=" p-2 flex justify-between hover:bg-[gray] transition-colors w-full hover:text-white"
                    >
                      <span className="flex text-left">
                        {t("Update Price With Amount")}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </button>
                    <div
                      action=""
                      className={
                        updatePriceWithMount
                          ? "form-detail-price transition-all updateTitle mt-2 active"
                          : "form-detail updateTitle mt-2"
                      }
                    >
                      <span className="text-left ml-[7px] mb-0 mt-[2rem] ">
                        {t("Current Price")}:
                      </span>
                      <input
                        className="text-left w-full mt  border rounded mb-2  p-[0.5rem]"
                        type="text"
                        disabled={true}
                        name=""
                        placeholder={showPrice}
                      />
                      <span className="text-left ml-[7px] mb-0 mt-[2rem]">
                        {t("Amount")}
                      </span>
                      <input
                        className="text-left w-full mt  border rounded mb-2  p-[0.5rem]"
                        type="text"
                        name="amount"
                        value={inputUpdatePriceAmount.amount}
                        onChange={handleUpdateAmountChange}
                        placeholder={t("Amount")}
                      />

                      <button
                        onClick={() => {
                          handleSubmitUpdateAmount(inputUpdatePriceAmount);
                        }}
                        className="btn-updateTitle bg-black w-full text-white rounded-[0.5rem] mt-4 text-[16px] p-2"
                      >
                        {t("UPDATE")}
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 border-b pb-[0.25rem] ">
                    <button
                      onClick={handleIsUpdatePriceWithPercent}
                      className=" p-2 flex justify-between hover:bg-[gray] transition-colors w-full hover:text-white"
                    >
                      <span className="flex text-left">
                        {t("Update Price With Percent")}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </button>
                    <div
                      className={
                        updatePriceWithPercent
                          ? "form-detail-price transition-all updateTitle mt-2 active"
                          : "form-detail updateTitle mt-2"
                      }
                    >
                      <span className="text-left ml-[7px] mb-0 mt-[2rem]">
                        {t("Current Price")}
                      </span>
                      <input
                        className="text-left w-full mt  border rounded mb-2  p-[0.5rem]"
                        type="text"
                        name="percent"
                        disabled={true}
                        placeholder={showPrice}
                      />
                      <span className="text-left ml-[7px] mb-0 mt-[2rem]">
                        {t("Percent")}:
                      </span>
                      <input
                        className="text-left w-full mt  border rounded mb-2  p-[0.5rem]"
                        type="text"
                        name="percent"
                        value={inputUpdatePricePercent.percent}
                        onChange={handleUpdatePercentChange}
                        placeholder="%"
                      />

                      <button
                        onClick={() => {
                          handleSubmitUpdatePercent(inputUpdatePricePercent);
                        }}
                        className="btn-updateTitle bg-black w-full text-white rounded-[0.5rem] mt-4 text-[16px] p-2"
                      >
                        {t("UPDATE")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {dialog.isOpen && (
                <Dialog
                  onDialog={areUSureDelete}
                  isOpen={dialog.isOpen}
                  message={dialog.message}
                />
              )}
              <div className="text-left mt-4">
                <h2>{t("Description")}</h2>
                <p className="text-left text-[12px]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Blanditiis quo, in vel ab molestiae nesciunt neque, architecto
                  id possimus voluptatum veniam itaque! Autem optio, alias totam
                  quasi corrupti quam nulla maxime vitae? Dolor a at distinctio.
                  Nihil ipsum necessitatibus mollitia nulla officia quis cumque
                  exercitationem sunt? Commodi soluta voluptatum ipsum?
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default DetailPage;
