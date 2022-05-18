import { HeaderLogo } from "@Components/Atoms";
import Link from "next/link";
import React from "react";
import {
    RiFacebookCircleFill,
    RiInstagramFill,
    RiTwitterFill,
} from "src/Assets/RemixIcon";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="flex flex-col items-center">
                <span className="inline-flex h-fit w-full items-center justify-center gap-2 p-2">
                    {"Follow us:"}
                    <RiInstagramFill />
                    <RiFacebookCircleFill />
                    <RiTwitterFill />
                </span>
                <HeaderLogo />
                <span className="inline-flex h-fit w-full items-center justify-center gap-2 p-2">
                    <Link href="/about" passHref>
                        <a>About us</a>
                    </Link>
                    <Link href="/contact" passHref>
                        <a>Contact</a>
                    </Link>
                </span>

                <span>Copyright © 2022 </span>
            </div>
        </footer>
    );
};

export default Footer;
