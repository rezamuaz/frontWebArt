import Image from "next/image";
import style from "@styles/detail.module.css";
import SocialShared from "./SocialShared";
import { parse as nodeparse } from "node-html-parser";
import { TimePosted } from "@Shared/lib/helper";
import { Tag, TagPopular } from ".";
import { Interweave, Markup } from "interweave";
import { renderToString } from "react-dom/server";

const Article = ({ props }) => {
    const list = props?.Latest.getPostsWithPagination.posts;
    const ctn = props.data.getPostByIdOrName;
    function insertLine(item) {
        const insertSource = (firstIndex, LastIndex) =>
            renderToString(
                <ul className="not-prose border-l-4 border-l-blue-400">
                    {list &&
                        list.slice(firstIndex, LastIndex).map((item, i) => (
                            <li className="not-prose list-none p-1" key={i}>
                                <a
                                    className="not-prose text-blue-600 hover:underline"
                                    href={item.href}
                                >
                                    {item.title}
                                </a>
                            </li>
                        ))}
                </ul>
            ).replace('data-reactroot=""', "");
        const root = nodeparse(item.content);
        const text = root.querySelectorAll("p").map((e) => e.outerHTML);
        // for (let index = 0; index < text.length; index++) {
        //     for (let j = 1; j < nfactor; j++) {
        //         if (j * 3 <= text.length) {
        //             text.splice(j * 3, 0, insertSource(0, 3));
        //         }
        //     }
        // }
        text.splice(3, 0, insertSource(0, 3));
        text.splice(9, 0, insertSource(4, 6));
        const Lines = text.join("");
        return Lines;
    }

    return (
        <article className="content">
            <h1 className="text-center text-3xl font-semibold text-blue-900 dark:text-slate-200">
                {ctn.title}
            </h1>
            <p className="mx-auto text-center text-base text-blue-900">
                oleh : {`${ctn.author.firstName} ${ctn.author.lastName}`}
            </p>
            <p className="text-center text-sm text-slate-500 dark:text-slate-200">
                {TimePosted(ctn.releaseAt)} WIB
            </p>
            <SocialShared />
            <figure className="h-fit w-full">
                <div className="relative h-0 w-full pb-[56%]">
                    <Image
                        src={ctn.image.url}
                        alt={ctn.image.title}
                        blurDataURL="/blur.png"
                        placeholder="blur"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <figcaption>
                    <small>{ctn.image.caption}</small>
                </figcaption>
            </figure>
            <div className="mt-5 flex h-full w-full flex-row">
                <Interweave
                    tagName="div"
                    className="article-detail-body"
                    content={insertLine(ctn)}
                />
                <ins className="hidden h-[600px] w-40 shrink-0 bg-neutral-200 p-0 md:block">
                    wide-skycrapper
                </ins>
            </div>
            <Tag props={ctn} />
        </article>
    );
};

export default Article;
