import React from "react";
import Select from "react-select";

function Multipleddl({ options, hasTag,setselectOptionTags}) {
  if (options.length > 0) {
    const tagFilter = options.filter((element) => !hasTag.includes(element));
    const optionnew = tagFilter.map((obj) => {
      return { value: obj, label: obj };
    }
    );
    return (
      <div className="w-full">
        <Select
          isSearchable={true}
          className="select"
          isMulti
          onChange={(tag) =>setselectOptionTags(tag)}
          closeMenuOnSelect={false}
          options={optionnew}
          isClearable={true}
        ></Select>
        
      </div>
    );
  }
}

export default Multipleddl;
