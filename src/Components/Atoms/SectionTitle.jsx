import React from "react";

const SectionTitle = ({ title, style }) => {
  return (
    <>
      <span
        className={`w-fit border-t-4 border-cviolet pt-2 font-semibold text-inherit ${style}`}
      >
        {title}
      </span>
    </>
  );
};

export default SectionTitle;
