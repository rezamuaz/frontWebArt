import React, { useState, useRef } from "react";
import { useAuthDispatch, useAuthState } from "@Context/AuthContext";
import { DarkModeToogle } from "@Components/Molecules";
import Link from "next/link";
import {
    RiArrowDropDownLine,
    RiDashboard2Line,
    RiHome4Line,
    RiImageLine,
    RiLogoutBoxRLine,
    RiPushpinLine,
    RiSeparator,
    RiSettings4Line,
    RiUserLine,
} from "src/Assets/RemixIcon";
import Image from "next/image";
import { useRouter } from "next/router";

const menuItems = [
    {
        title: "Dashboard",
        url: "/manage/dashboard",
        icon: <RiDashboard2Line className="h-6 w-6" />,
    },
    {
        title: "Post",
        url: "#",
        icon: <RiPushpinLine className="h-6 w-6" />,
        arrow: <RiArrowDropDownLine className="h-6 w-6" />,
        submenu: [
            {
                title: "New",
                url: "/post/new",
            },
            {
                title: "List",
                url: "/post/list",
            },
            {
                title: "Category",
                url: "/post/category",
            },
        ],
    },
    {
        title: "Media",
        url: "/manage/media",
        icon: <RiImageLine className="h-6 w-6" />,
    },
    {
        title: "User",
        url: "#",
        icon: <RiUserLine className="h-6 w-6" />,
        arrow: <RiArrowDropDownLine className="h-6 w-6" />,
        submenu: [
            {
                title: "Profile",
                url: "/manage/user/profile",
            },
            {
                title: "Manage",
                url: "/manage/user",
            },
        ],
    },
    {
        title: "Settings",
        url: "#",
        icon: <RiSettings4Line className="h-6 w-6" />,
        arrow: <RiArrowDropDownLine className="h-6 w-6" />,
        submenu: [
            {
                title: "Menu",
                url: "/manage/settings",
            },
        ],
    },
];

const AdminNavbar = ({ page, show }) => {
    const dispatch = useAuthDispatch();
    const { user } = useAuthState();
    const router = useRouter();
    function handleLogout() {
        dispatch("LOGOUT");
        router.push("/login");
    }
    const handleMenu = (e, href) => {
        e.preventDefault();
        router.push(href);
    };
    function Submenu({ subitems, icon, title, arrow }) {
        const [active, setActive] = useState(false);
        function toggleAccordion() {
            setActive(!active);
        }
        return (
            <li>
                <a
                    className="my-2 inline-flex w-full items-center gap-x-2 p-1"
                    onClick={toggleAccordion}
                >
                    <span className="h-5 w-5">{icon}</span>
                    {title}
                    <span className="h-5 w-5">{arrow}</span>
                </a>
                <ul
                    className={`layer-8 my-2 ml-8 w-full rounded-md transition-all duration-500 ease-in-out ${
                        active
                            ? "h-fit"
                            : "my-0 h-0 overflow-hidden transition-all duration-500 ease-in-out"
                    }`}
                >
                    {subitems.map((item, index) => {
                        return (
                            <li
                                className="h-fit w-full cursor-pointer p-2 text-sm"
                                key={index}
                                type="button"
                                onClick={(e) => handleMenu(e, item.url)}
                            >
                                <a className="inline-flex items-center gap-x-2">
                                    {item.title}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </li>
        );
    }

    return (
        <nav
            className={`layer-9 absolute top-0 z-50 h-screen w-80 text-base transition-all duration-500 ease-in-out md:static md:translate-x-0 ${
                show ? "translate-x-0" : "-translate-x-full "
            }`}
        >
            <div
                className="layer-8 flex h-14 w-full cursor-pointer items-center gap-x-2 px-2 text-2xl"
                type="button"
                onClick={(e) => handleMenu(e, "/")}
            >
                <RiHome4Line className="layer-9 h-10 w-10 p-2" />
                {page}
            </div>
            <div className="my-4 h-fit w-full rounded-tr-md text-base">
                <div className="h-fit w-full p-2 text-center text-base font-medium ">
                    {user !== null ? user.role : ""}
                </div>
                <div className="h-fit w-full">
                    <div className="layer-8 mx-auto h-16 w-16 overflow-hidden rounded-full">
                        {user === null || user.image === null ? (
                            <RiUserLine className="h-16 w-16 p-2" />
                        ) : (
                            <img
                                src={user.image}
                                width="100"
                                height="100"
                                layout="responsive"
                                objectfit="cover"
                            />
                        )}
                    </div>
                </div>
                <div className="h-fit w-full p-2 text-center text-base font-medium ">
                    {user !== null ? user.username : ""}
                </div>
            </div>
            <div className="ml-4 h-fit w-full py-2 pr-4 ">
                <ul className="flex h-full w-full flex-col">
                    {menuItems.map((menuitem, index) => {
                        if (menuitem.submenu != undefined) {
                            return (
                                <Submenu
                                    key={index}
                                    icon={menuitem.icon}
                                    title={menuitem.title}
                                    arrow={menuitem.arrow}
                                    subitems={menuitem.submenu}
                                />
                            );
                        } else {
                            return (
                                <li
                                    className="my-2 h-min w-full cursor-pointer p-1"
                                    key={index}
                                    type="button"
                                    onClick={(e) => handleMenu(e, menuitem.url)}
                                >
                                    <a className="inline-flex items-center gap-x-2">
                                        <span className="h-5 w-5">
                                            {menuitem.icon}
                                        </span>
                                        {menuitem.title}
                                    </a>
                                </li>
                            );
                        }
                    })}
                </ul>
            </div>
            <button
                type="button"
                className="inline-flex h-fit w-full items-center gap-x-2 px-5"
                onClick={handleLogout}
            >
                <RiLogoutBoxRLine className="h-5 w-5" />
                Logout
            </button>
            <div className="inline-flex h-fit w-full items-center justify-center px-3 py-2">
                <DarkModeToogle />
            </div>
        </nav>
    );
};

export default AdminNavbar;
