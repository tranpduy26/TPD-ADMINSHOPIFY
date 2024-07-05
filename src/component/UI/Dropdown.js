import React, { useState } from "react";

function Dropdown(props) {
  const [isActive, setisActive] = useState(false);

  return (
    <>
      <div className="dropdown">
        <div
          className="dropdown-btn flex justify-between "
          onClick={(e) => {
            setisActive(!isActive);
          }}
        >
          <div className="max-w-[11rem] flex items-center truncate ... overflow-hidden max-h-[1.5rem] font-light">
            {props.selected && props.selected !== "- (clear...) -"
              ? props.selected
              : props.content}
          </div>
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
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        <div
          onClick={(e) => {
            setisActive(!isActive);
          }}
          className={
            isActive
              ? "dropdown-content z-10 overflow-scroll max-h-[10rem]  active"
              : "dropdown-content z-10 overflow-scroll max-h-[10rem] "
          }
        >
          {props.options.map((option, index) => {
            return (
              <div
                className="dropdown-item"
                onClick={(e) => {
                  props.setselected(option);
                  setisActive(false);
                }}
                key={index}
              >
                {option}
              </div>
            );
          })}
        </div>
      </div>
      {isActive && (
        <div
          onClick={(e) => {
            setisActive(!isActive);
          }}
          className=" w-full h-screen z-[9] absolute top-0 right-0"
        ></div>
      )}
    </>
  );
}

export default Dropdown;
