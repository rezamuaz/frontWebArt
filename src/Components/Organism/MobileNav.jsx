import useOutsideClick from "@Shared/utils/useOutsideClick";
import Link from "next/link";
import React from "react";

const MobileNav = ({ slide, menu, ref }) => {
    return (
        <div
            className={`absolute h-screen w-full transform text-sm font-medium delay-300 ease-in-out md:hidden ${
                slide
                    ? "translate-x-0 duration-300"
                    : "-translate-x-full transition-all delay-300"
            }`}
        >
            <div className="mx-auto overflow-y-scroll">
                <ul className="normal-bg flex flex-initial flex-col">
                    {menu?.map((e, i) => (
                        <Link
                            key={i}
                            href={`/category/${e.name.toLocaleLowerCase()}`}
                        >
                            <a>
                                <li className=" border-b-[1px] py-3 px-4 capitalize delay-300 ease-in-out hover:bg-blue-600">
                                    <span>{e.name}</span>
                                </li>
                            </a>
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MobileNav;
