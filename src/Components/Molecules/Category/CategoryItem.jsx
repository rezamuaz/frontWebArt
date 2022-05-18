import { TimeAgo } from "src/Shared/lib/helper";
import Image from "next/image";
import Link from "next/link";

const CategoryItem = ({ i, title, imageAlt, imageUrl, date, author, slug }) => {
    let time = TimeAgo(date);

    return (
        <li key={i} className="flex h-fit w-full flex-col pb-3">
            <Link href={`/${slug}`} passHref>
                <a>
                    <figure className="relative h-0 w-full pb-[50%]">
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
                    <h2 className="h-fit w-fit text-ellipsis whitespace-pre-wrap pt-2 text-sm font-semibold line-clamp-3">
                        {title}
                    </h2>
                    <span className="my-1 text-xs capitalize text-inherit">
                        Oleh: {`${author.firstName} ${author.lastName}`}
                    </span>
                    <span className="my-0 h-fit w-fit pl-2 text-xs text-slate-500">
                        {time}
                    </span>
                </a>
            </Link>
        </li>
    );
};

export default CategoryItem;
