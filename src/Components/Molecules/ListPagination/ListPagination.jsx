import { useRouter } from "next/router";
import React from "react";
import ReactPaginate from "react-paginate";
import ListItem from "./ListItem";
import ListItemHeader from "./ListItemHeader";

const ListPagination = ({ props }) => {
    const router = useRouter();
    const paginationHandler = (page) => {
        const currentPath = router.pathname;
        const currentQuery = router.query;
        currentQuery.page = page.selected + 1;
        router.push({
            pathname: currentPath,
            query: currentQuery,
        });
    };
    return (
        <>
            <div className="content">
                <>
                    <ul className="w-full">
                        <li className="w-full pb-3">
                            {props?.posts &&
                                props?.posts.map(
                                    (
                                        {
                                            slug,
                                            image,
                                            title,
                                            author,
                                            releaseAt,
                                            description,
                                        },
                                        index
                                    ) => {
                                        if (index === 0) {
                                            return (
                                                <ListItemHeader
                                                    key={index}
                                                    slug={slug}
                                                    imageUrl={image.url}
                                                    imageTitle={image.Title}
                                                    title={title}
                                                    author={author}
                                                    releaseAt={releaseAt}
                                                    description={description}
                                                    index={index}
                                                />
                                            );
                                        }
                                    }
                                )}
                        </li>
                        {props?.posts &&
                            props?.posts.map(
                                (
                                    {
                                        _id,
                                        title,
                                        slug,
                                        author,
                                        image,
                                        category,
                                        description,
                                        releaseAt,
                                    },
                                    index
                                ) => {
                                    if (index >= 1 && index <= 9) {
                                        return (
                                            <ListItem
                                                key={index}
                                                slug={slug}
                                                category={category}
                                                title={title}
                                                releaseAt={releaseAt}
                                                index={index}
                                                imageUrl={image.url}
                                                imageTitle={image.Title}
                                            />
                                        );
                                    }
                                }
                            )}
                    </ul>
                </>
                {props?.paginator?.totalPosts === 0 ? (
                    <div className="mt-2 flex h-fit w-full items-center justify-center p-1 text-2xl font-semibold">
                        Not Found
                    </div>
                ) : (
                    <div className="mt-2 flex h-fit w-full items-center justify-center bg-neutral-700 p-1">
                        <ReactPaginate
                            previousLabel={"<"}
                            nextLabel={">"}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            s
                            activeClassName={"rounded-full bg-cviolet"}
                            pageClassName={"rounded-full bg-cblue px-2"}
                            previousClassName={"bg-cblue rounded-full px-2"}
                            nextClassName={"bg-cblue rounded-full px-2"}
                            containerClassName={
                                "w-fit h-min p-2 inline-flex gap-2"
                            }
                            subContainerClassName={"pages pagination"}
                            initialPage={props?.paginator?.currentPage - 1}
                            pageCount={props?.paginator?.totalPages}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={paginationHandler}
                        />
                    </div>
                )}
            </div>
        </>
    );
};

export default ListPagination;
