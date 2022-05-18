import Link from "next/link";
import React from "react";
import { RiArrowRightLine } from "src/Assets/RemixIcon";

const ButtonH = ({ title, link, ...props }) => {
    return (
        <button {...props}>
            <Link href={link || "/"}>
                <a className="group relative inline-flex items-center justify-center overflow-hidden rounded-md border-2 border-blue-500 p-2 font-medium text-indigo-600 shadow-md transition duration-300 ease-out">
                    <span className="ease absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-blue-500 text-white duration-300 group-hover:translate-x-0">
                        <RiArrowRightLine />
                    </span>
                    <span className="ease absolute flex h-full w-full transform items-center justify-center text-blue-500 transition-all duration-300 group-hover:translate-x-full">
                        {title}
                    </span>
                    <span className="invisible relative">{title}</span>
                </a>
            </Link>
        </button>
    );
};

export default ButtonH;
