import Link from "next/link";

const PopularItem = ({ index, href, title }) => {
    return (
        <li className="my-2 h-fit w-full" key={index}>
            <Link href={`/${href}`}>
                <a className="inline-flex items-center justify-start">
                    <span className="text-md inline-flex h-8 w-8 flex-none items-center justify-center bg-cviolet text-slate-100 ">
                        {index + 1}
                    </span>
                    <span className="h-fit w-full flex-auto text-ellipsis whitespace-pre-wrap pl-2 text-sm font-semibold leading-5 line-clamp-3">
                        {title}
                    </span>
                </a>
            </Link>
        </li>
    );
};

export default PopularItem;
