import Link from "next/link";
import React from "react";

const TagItem = ({ index, label, value }) => {
    return (
        <Link href={`/tag/${value}`} passHref>
            <a
                className="m-1 rounded-[4px] border-[1px] border-blue-800 px-2 py-1"
                key={index}
            >
                {label}
            </a>
        </Link>
    );
};

export default TagItem;
