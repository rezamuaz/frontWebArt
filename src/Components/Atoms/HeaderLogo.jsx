import Link from "next/link";

const HeaderLogo = () => {
    return (
        <Link href="/" passHref>
            <a>
                <span className="h-full bg-gradient-to-r from-cblue via-pink-600 to-cviolet bg-clip-text px-2 text-center text-3xl font-bold text-transparent md:px-4 md:text-3xl lg:p-0 lg:text-5xl">
                    HorizonIndo
                </span>
            </a>
        </Link>
    );
};

export default HeaderLogo;
