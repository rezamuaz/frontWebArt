import React from "react";
import Image from "next/image";
import { TimePosted } from "@Shared/lib/helper";
import Link from "next/link";

const RandomItem = ({ i, title, imageAlt, imageUrl, time, slug }) => {
    return (
        <li key={i} className="mx-2 flex h-fit w-fit flex-col">
            <Link href={slug} passHref>
                <a className="h-fit w-fit">
                    <div className="relative h-32 w-48">
                        <Image
                            className="transform rounded transition duration-500 hover:scale-125"
                            src={imageUrl}
                            alt={imageAlt}
                            layout="fill"
                            blurDataURL="/blur.png"
                            placeholder="blur"
                            objectFit="cover"
                        />
                    </div>
                    <h1 className="w-48 text-ellipsis whitespace-pre-wrap py-1 text-sm line-clamp-3">
                        {title}
                    </h1>
                    <span className="my-0 h-fit w-full text-xs text-slate-500">
                        {TimePosted(time)}
                    </span>
                </a>
            </Link>
        </li>
    );
};

export default RandomItem;
