import React from "react";
import Image from "next/image";
import { TimePosted } from "@Shared/lib/helper";
import LatestItem from "./LatestItem";
import Link from "next/link";

const LatestList = ({ list }) => {
    list;

    return (
        <section className="latest">
            {list &&
                list.map((e, i) => {
                    if (i === 0) {
                        return (
                            <article key={i}>
                                <Link href={`/${e.slug}`} passHref>
                                    <a className="flex h-fit w-full flex-col md:flex-row">
                                        <span className="absolute top-0 z-10 h-8 w-fit bg-neutral-800 px-2 py-1 text-center align-middle text-slate-100 md:top-12">
                                            Headline
                                        </span>
                                        <div className="order-2 flex w-full flex-col items-start justify-center bg-neutral-600 p-3 text-slate-300 md:order-1 md:w-2/5">
                                            <h2 className="mb-2 text-xl font-bold text-slate-50">
                                                <strong>{e.title}</strong>
                                            </h2>
                                            <span className="text-xs capitalize text-inherit">
                                                Oleh:{" "}
                                                {`${e.author.firstName} ${e.author.lastName}`}
                                            </span>
                                            <span className="text-xs text-inherit">
                                                {TimePosted(e.releaseAt)} WIB
                                            </span>
                                            <p className="mt-2">
                                                {e.description}
                                            </p>
                                        </div>
                                        <figure className="relative order-1 h-0 w-full pb-[55%] md:order-2 md:w-3/5 md:pb-[45%]">
                                            <Image
                                                className="transform transition duration-500 hover:scale-125"
                                                src={e.image.url}
                                                alt={e.image.title}
                                                blurDataURL="/blur.png"
                                                placeholder="blur"
                                                layout="fill"
                                                objectFit="cover"
                                            />
                                        </figure>
                                    </a>
                                </Link>
                            </article>
                        );
                    }
                })}

            <ul className="my-2 flex h-fit w-full flex-col md:flex-row">
                {list &&
                    list.map((e, i) => {
                        if (i >= 1 && i <= 2) {
                            return (
                                <LatestItem
                                    key={e._id}
                                    imageUrl={e.image.url}
                                    imageAlt={e.image.title}
                                    category={e.category}
                                    date={e.releaseAt}
                                    title={e.title}
                                    index={e._id}
                                    slug={e.slug}
                                />
                            );
                        }
                    })}
            </ul>
            <div className="text my-2 h-fit w-full text-center ">
                <button
                    title=""
                    className="rounded-[3px] bg-cblue p-2 text-sm font-semibold text-slate-200"
                >
                    <Link href="/terbaru" passHref>
                        <a>{"Selengkapnya"}</a>
                    </Link>
                </button>
            </div>
        </section>
    );
};

export default LatestList;
