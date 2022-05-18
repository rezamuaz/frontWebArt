import Link from "next/link";
import React from "react";
import { RiSearchLine } from "src/Assets/RemixIcon";

const MobileSearchBox = ({ open, handleText, onSubmit, handleClick, text }) => {
    return (
        <div
            className={`normal-bg dark-text absolute z-10 flex h-[50vh] w-full transform items-center justify-center text-sm font-medium delay-300 ease-in-out md:hidden ${
                open
                    ? "translate-x-0 duration-300"
                    : "-translate-x-full transition-all delay-300"
            }`}
        >
            <form
                onSubmit={onSubmit}
                className=" relative inline-flex h-fit w-fit md:hidden"
            >
                <input
                    type="text"
                    className="h-fit rounded-2xl border-2 py-2 pr-8 pl-5 focus:shadow focus:outline-none md:w-60"
                    placeholder="Cari Berita..."
                    value={text}
                    onChange={(e) => handleText(e.target.value)}
                />
                <button
                    className="absolute right-2 h-full align-middle"
                    type="submit"
                    onClick={(e) => handleClick(e)}
                >
                    <RiSearchLine title="search" titleId="search" />
                </button>
            </form>
        </div>
    );
};

export default MobileSearchBox;
