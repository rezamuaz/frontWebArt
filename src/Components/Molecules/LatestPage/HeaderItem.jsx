import { TimePosted } from "@Shared/lib/helper";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

const HeaderItem = ({
    slug,
    index,
    imageUrl,
    imageTitle,
    title,
    author,
    releaseAt,
    description,
}) => {
    return (
        <Fragment>
            <article key={index}>
                <Link href={`/${slug}`} passHref>
                    <a className="flex h-fit w-full flex-col">
                        <span className="absolute top-12 z-10 h-8 w-fit bg-cblue px-2 py-1 text-center align-middle text-slate-100">
                            Headline
                        </span>
                        <figure className="relative h-0 w-full pb-[45%]">
                            <Image
                                className="transform transition duration-500 hover:scale-125"
                                src={imageUrl}
                                alt={imageTitle}
                                layout="fill"
                                blurDataURL="/blur.png"
                                placeholder="blur"
                                objectFit="cover"
                            />
                        </figure>
                        <div className="flex w-full flex-col items-start justify-center bg-neutral-600 p-3 text-slate-300">
                            <h2 className="font mb-2 text-2xl font-semibold text-slate-50">
                                <strong>{title}</strong>
                            </h2>
                            <span className="text-xs capitalize text-inherit">
                                Oleh: {`${author.firstName} ${author.lastName}`}
                            </span>
                            <span className="text-xs text-inherit">
                                {TimePosted(releaseAt)} WIB
                            </span>
                            <p className="mt-2">{description}</p>
                        </div>
                    </a>
                </Link>
            </article>
        </Fragment>
    );
};

export default HeaderItem;
