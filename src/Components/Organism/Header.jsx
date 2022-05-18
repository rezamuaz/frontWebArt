import { useState, useEffect, useRef, createRef, useCallback } from "react";
import { DarkModeToogle, MenuButton, Search } from "@Components/Molecules";
import { HeaderLogo } from "@Components/Atoms";
import MobileNav from "./MobileNav";
import { MobileSearchBox } from ".";
import { useRouter } from "next/router";
import useOutsideClick from "@Shared/utils/useOutsideClick";

const Header = ({ menu }) => {
    const [slide, setSlide] = useState(false);
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");
    const router = useRouter();
    const ref = createRef();

    const handleClick = () => {
        router.push({ pathname: "/search", query: { q: text } });
        setOpen(false);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        router.push({ pathname: "/search", query: { q: text } });
    };

    const handleText = (e) => {
        setText(e);
    };
    const handleShow = (e) => {
        e.preventDefault();
        setOpen(!open);
    };

    const HandleClick = () => {
        setSlide(!slide);
        setTimeout(() => {
            setSlide(false);
        }, 5000);
    };

    return (
        <header className="header">
            <div className="mx-auto flex h-full items-center justify-between px-2 md:w-10/12">
                <MenuButton slide={slide} Handle={HandleClick} />
                <HeaderLogo />
                <Search
                    onSubmit={onSubmit}
                    handleShow={handleShow}
                    handleText={handleText}
                    handleClick={handleClick}
                    text={text}
                />
                <DarkModeToogle />
            </div>
            <MobileNav slide={slide} menu={menu} />
            <MobileSearchBox
                open={open}
                handleText={handleText}
                onSubmit={onSubmit}
                handleClick={handleClick}
                text={text}
            />
        </header>
    );
};

export default Header;
