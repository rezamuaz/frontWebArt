import React from "react";

const Label = ({ title, ...props }) => {
    return <label {...props}>{title}</label>;
};

export default Label;
