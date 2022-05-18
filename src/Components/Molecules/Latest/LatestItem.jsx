import Image from "next/image";
import { TimePosted } from "src/Shared/lib/helper";
import Link from "next/link";
import { Fragment } from "react";

const LatestItem = ({
    imageAlt,
    index,
    imageUrl,
    category,
    date,
    slug,
    title,
}) => {
    return (
        <li key={index} className=" mt-2 inline-flex">
            <Link href={`/${slug}`} passHref>
                <a className="inline-flex">
                    <figure className="relative h-32 w-36 flex-none overflow-hidden rounded-sm md:h-32 md:w-44 ">
                        <Image
                            className="transform transition duration-500 hover:scale-125"
                            src={imageUrl}
                            alt={imageAlt}
                            layout="fill"
                            blurDataURL="/blur.png"
                            placeholder="blur"
                            objectFit="cover"
                        />
                    </figure>
                    <div className="flex h-full flex-1 flex-col justify-between px-2 text-gray-700 dark:text-gray-200">
                        <span className="inline-flex w-fit bg-cblue p-1 text-xs font-semibold uppercase text-slate-50">
                            {category[0].name}
                        </span>

                        <h2 className="text-ellipsis py-1 text-sm font-bold line-clamp-3">
                            {title}
                        </h2>
                        <span className=" pl-1 text-xs text-gray-500">
                            {TimePosted(date)}
                        </span>
                    </div>
                </a>
            </Link>
        </li>
    );
};

export default LatestItem;
