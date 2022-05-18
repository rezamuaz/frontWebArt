import { SectionTitle } from "@Components/Atoms";
import CategoryItem from "./CategoryItem";
import { TimePosted } from "@Shared/lib/helper";
import Image from "next/image";
import { Fragment } from "react";
import Link from "next/link";
import ButtonH from "@Components/Atoms/ButtonH";

const CategoryList = ({ category }) => {
    const name = category[0].category[0].name;
    return (
        <section className="mt-10 h-min w-full">
            <SectionTitle title={name} />
            <article className="mt-6 flex h-fit w-full flex-col md:flex-row">
                <ul className="order-2 mt-6 flex h-fit w-full flex-initial flex-col md:order-1 md:mt-0 md:w-[250px] md:pr-4">
                    {category &&
                        category.map((e, i) => {
                            if (i >= 1 && i <= 2) {
                                return (
                                    <CategoryItem
                                        key={i}
                                        i={i}
                                        title={e.title}
                                        imageUrl={e.image.url}
                                        author={e.author}
                                        slug={e.slug}
                                        date={e.releaseAt}
                                    />
                                );
                            }
                        })}
                </ul>
                <div className="order-1 flex h-full flex-auto flex-col md:order-2">
                    {category &&
                        category.map((e, i) => {
                            if (i === 0) {
                                return (
                                    <Link key={i} href={`/${e.slug}`} passHref>
                                        <a>
                                            <figure className="relative h-0 w-full pb-[50%]">
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
                                            <div className="flex w-full grow flex-col items-start justify-center bg-neutral-600 p-3 text-slate-300">
                                                <h2 className="mb-2 text-xl font-bold text-slate-50">
                                                    <strong>{e.title}</strong>
                                                </h2>
                                                <span className="text-xs capitalize text-inherit">
                                                    Oleh:{" "}
                                                    {`${e.author.firstName} ${e.author.lastName}`}
                                                </span>
                                                <span className="text-xs text-inherit">
                                                    {TimePosted(e.releaseAt)}{" "}
                                                    WIB
                                                </span>
                                                <p className="mt-2">
                                                    {e.description}
                                                </p>
                                            </div>
                                        </a>
                                    </Link>
                                );
                            }
                        })}
                </div>
            </article>
            <div className="text my-2 h-fit w-full text-center ">
                <button className="mr-0 rounded-[3px] bg-cblue p-2 text-sm font-semibold text-slate-200">
                    <Link href={`/category/${name.toLowerCase()}`} passHref>
                        <a>{"Selengkapnya"}</a>
                    </Link>
                </button>
            </div>
        </section>
    );
};

export default CategoryList;
