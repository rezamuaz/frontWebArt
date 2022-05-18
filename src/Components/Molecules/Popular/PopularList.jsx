import { Fakeads } from "@Components/Advertisement/fakeads";
import { Button, SectionTitle } from "@Components/Atoms";
import Image from "next/image";
import Link from "next/link";
import PopularItem from "./PopularItem";

const PopularList = ({ props }) => {
    const getShuffledArr = (arr) => {
        const newArr = arr.slice();
        for (let i = newArr.length - 1; i > 0; i--) {
            const rand = Math.floor(Math.random() * (i + 1));
            [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
        }
        return newArr;
    };

    const List = getShuffledArr(props);
    return (
        <section className="sticky top-0 h-fit w-full border-b-2 py-4">
            <SectionTitle
                title="Popular"
                style="text-lg font-semibold"
                bg="text-blue-700 md:text-slate-100 md:bg-gradient-to-r from-blue-800 via-indigo-900 to-blue-700"
            />
            {List &&
                List.map((e, i) => {
                    if (i >= 0 && i <= 5) {
                        return (
                            <Link key={i} href={`/${e.slug}`}>
                                <a>
                                    <div className="h-fit w-full py-2">
                                        <figure className="relative h-0 w-full pb-[60%]">
                                            <span className="absolute top-0 z-10 h-8 w-8 bg-cviolet p-1 text-center text-slate-100">
                                                {i + 1}
                                            </span>
                                            <Image
                                                src={e.image.url}
                                                alt={e.image.title}
                                                blurDataURL="/blur.png"
                                                placeholder="blur"
                                                layout="fill"
                                                objectFit="cover"
                                            />
                                        </figure>
                                        <h2 className="mt-2 text-ellipsis whitespace-pre-wrap text-sm font-semibold leading-5 line-clamp-3">
                                            {e.title}
                                        </h2>
                                    </div>
                                </a>
                            </Link>
                        );
                    }
                })}

            {/* <ul className="flex h-min w-full flex-col">
                {List &&
                    List.map((e, i) => {
                        if (i >= 1 && i <= 4) {
                            return (
                                <PopularItem
                                    key={i}
                                    index={i}
                                    href={e.image.url}
                                    title={e.title}
                                    slug={e.slug}
                                />
                            );
                        }
                    })}
            </ul> */}
            {/* <div className="h-fit w-full text-center">
                <Button
                    title="Selengkapnya"
                    className="rounded bg-blue-700 p-2 text-sm font-semibold text-slate-200"
                />
            </div> */}
        </section>
    );
};

export default PopularList;
