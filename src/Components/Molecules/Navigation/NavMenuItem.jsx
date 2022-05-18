import Link from "next/link";

const NavMenuItem = ({ index, name }) => {
    return (
        <Link href={`/category/${name}`} passHref key={index}>
            <a>
                <li className="mx-2 p-2 capitalize">{name}</li>
            </a>
        </Link>
    );
};

export default NavMenuItem;
