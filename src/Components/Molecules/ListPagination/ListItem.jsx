import { TimePosted } from "@Shared/lib/helper";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ListItem = ({
    index,
    slug,
    imageUrl,
    imageTitle,
    category,
    title,
    releaseAt,
}) => {
    return (
        <>
            <li key={index} className=" mt-2">
                <Link href={`/${slug}`} passHref>
                    <a className="flex flex-col md:flex-row">
                        <figure className="relative h-36 w-56 flex-initial overflow-hidden rounded-sm ">
                            <Image
                                className="transform transition duration-500 hover:scale-125"
                                src={imageUrl}
                                alt={imageTitle}
                                blurDataURL="/blur.png"
                                placeholder="blur"
                                layout="fill"
                                objectFit="cover"
                            />
                            <span className="absolute top-0 left-0 w-fit  bg-cblue p-1 text-xs font-semibold uppercase text-white md:hidden">
                                {`${category[0].name}`}
                            </span>
                        </figure>
                        <div className="flex h-full flex-1 flex-col justify-between px-2 text-gray-700 dark:text-gray-200">
                            <span className="hidden w-fit bg-cblue p-1 text-xs font-semibold uppercase text-white md:inline-flex">
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

export default ListItem;
