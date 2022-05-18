import { TimePosted } from "@Shared/lib/helper";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const PaginationpageItem = ({
    index,
    slug,
    imageUrl,
    imageTitle,
    category,
    title,
    releaseAt,
}) => {
    const router = useRouter();
    function handleLink(e, cat) {
        e.preventDefault();
        router.push({
            pathname: "/category/[category]",
            query: { category: cat },
        });
    }

    return (
        <>
            <li key={index} className=" mt-2">
                <Link href={`/${slug}`} passHref>
                    <a className="flex flex-col md:flex-row">
                        <figure className="relative h-60 max-w-lg flex-initial overflow-hidden rounded-sm md:h-36 md:w-56 ">
                            <Image
                                className="transform transition duration-500 hover:scale-125"
                                src={imageUrl}
                                alt={imageTitle}
                                layout="fill"
                                blurDataURL="/blur.png"
                                placeholder="blur"
                                objectFit="cover"
                            />
                            <span
                                onClick={(e) => handleLink(e, category[0].name)}
                                className="absolute top-0 left-0 w-fit cursor-pointer bg-cblue p-1 text-xs font-semibold uppercase text-white md:hidden"
                            >{`${category[0].name}`}</span>
                        </figure>
                        <div className="flex h-full flex-1 flex-col justify-between px-2 text-gray-700 dark:text-gray-200">
                            <span
                                onClick={(e) => handleLink(e, category[0].name)}
                                className="hidden w-fit cursor-pointer bg-cblue p-1 text-xs font-semibold uppercase text-white md:inline-flex"
                            >
                                {`${category[0].name}`}
                            </span>
                            <h2 className="text-ellipsis py-1 text-lg font-bold line-clamp-3">
                                {title}
                            </h2>
                            <span className=" pl-1 text-xs text-gray-500">
                                {TimePosted(releaseAt)}
                            </span>
                        </div>
                    </a>
                </Link>
            </li>
        </>
    );
};

export default PaginationpageItem;
