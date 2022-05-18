import React, { useEffect, useState } from "react";
import {
    search,
    mapImageResources,
    getFolders,
    folders,
} from "@Shared/lib/cloudinary";
import Button from "@Components/Atoms/Button";
import { RiFolder2Line, RiLink } from "src/Assets/RemixIcon";
import LayoutPanel from "@Components/Templates/LayoutPanel";

export default function Media({
    images: defaultImages,
    nextCursor: defaultNextCursor,
    totalCount: defaultTotalCount,
    folders,
}) {
    const [images, setImages] = useState(defaultImages);
    const [nextCursor, setNextCursor] = useState(defaultNextCursor);
    const [totalCount, setTotalCount] = useState(defaultTotalCount);
    const [activeFolder, setActiveFolder] = useState();
    useEffect(() => {
        (async function run() {
            const results = await fetch("/api/cloudinarySearch", {
                method: "POST",
                body: JSON.stringify({
                    expression: `folder="${activeFolder || ""}"`,
                }),
            }).then((r) => r.json());

            const {
                resources,
                next_cursor: nextPageCursor,
                total_count: updatedTotalCount,
            } = results;

            const images = await mapImageResources(resources);

            setImages(images);
            setNextCursor(nextPageCursor);
            setTotalCount(updatedTotalCount);
        })();
    }, [activeFolder]);

    function handleOnFolderClick(e) {
        const folderPath = e.target.dataset.folderPath;
        setActiveFolder(folderPath);
        setNextCursor(undefined);
        setImages([]);
        setTotalCount(0);
    }

    async function handleOnLoadMore(e) {
        e.preventDefault();
        const results = await fetch("/api/cloudinarySearch", {
            method: "POST",
            body: JSON.stringify({
                expression: `folder=""`,
                nextCursor,
            }),
        }).then((r) => r.json());

        const {
            resources,
            next_cursor: nextPageCursor,
            total_count: updatedTotalCount,
        } = results;
        setTotalCount(updatedTotalCount);
        const images = mapImageResources(resources);
        setImages((prev) => {
            return [...prev, ...images];
        });
        setNextCursor(nextPageCursor);
    }

    const copy = async (text) => {
        await clipboard.writeText(text);
        alert("Text copied");
    };

    return (
        <LayoutPanel>
            <div className="layer-8 h-full w-full flex-auto flex-row overflow-y-scroll px-8 pt-14 ">
                <h1 className="sr-only">My Images</h1>
                <h2>Folders</h2>
                <ul
                    className="flex h-fit w-fit flex-row pb-8"
                    onClick={handleOnFolderClick}
                >
                    {folders?.map((folder) => {
                        const isActive = folder.path === activeFolder;
                        return (
                            <li
                                className="mx-4 flex h-fit w-fit flex-col text-center"
                                key={folder.path}
                            >
                                <button data-active-folder={isActive}>
                                    <RiFolder2Line
                                        className="h-14 w-16"
                                        data-folder-path={folder.path}
                                    />
                                    {folder.name}
                                </button>
                            </li>
                        );
                    })}
                </ul>
                <h2>Images</h2>
                <ul className="light-text flex flex-row flex-wrap gap-2">
                    {images?.map((image) => {
                        return (
                            <li key={image.id}>
                                <a>
                                    <div className=" relative h-[150px] w-[200px] overflow-clip text-base">
                                        <button
                                            onClick={() =>
                                                navigator.clipboard.writeText(
                                                    image.image
                                                )
                                            }
                                            className="absolute top-0 right-0 z-10 m-1"
                                            title="copy url"
                                        >
                                            <RiLink className=" h-6 w-6 " />
                                        </button>

                                        <img
                                            width="200"
                                            height="150"
                                            src={image.image}
                                            objectfit="cover"
                                            alt=""
                                        />
                                        <div className="absolute bottom-0 left-0 z-10 h-fit w-full overflow-hidden text-ellipsis bg-zinc-800 bg-opacity-80 p-2">
                                            {image.title}
                                        </div>
                                    </div>
                                </a>
                            </li>
                        );
                    })}
                </ul>
                {totalCount > images.length && (
                    <p>
                        <Button onClick={handleOnLoadMore}>
                            Load More Results
                        </Button>
                    </p>
                )}
            </div>
        </LayoutPanel>
    );
}

export async function getServerSideProps() {
    const results = await search();
    const { folders } = await getFolders();
    const {
        resources,
        next_cursor: nextCursor,
        total_count: totalCount,
    } = results;
    const images = await mapImageResources(resources);
    return {
        props: {
            images,
            nextCursor: nextCursor || false,
            totalCount,
            folders,
        },
    };
}
