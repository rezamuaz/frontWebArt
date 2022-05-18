import { Popular } from "@Components/Molecules";
import ListItem from "@Components/Molecules/ListPagination/ListItem";
import { Sidebar } from "@Components/Organism";
import Layout from "@Components/Templates/Layout";
import LayoutContent from "@Components/Templates/LayoutContent";
import { POST_SEARCH } from "@Shared/lib/GraphqlSchema";
import { loadLatest, loadSearch, SWRfetcher } from "@Shared/lib/Request";
import { useRouter } from "next/router";
import React from "react";
import ReactPaginate from "react-paginate";
import useSWR from "swr";

const Search = (props) => {
    const router = useRouter();
    const options = {
        fallbackData: props.fallback,
    };
    const variables = {
        search: props.query.q,
    };
    const { data, isValidating } = useSWR(
        [POST_SEARCH, variables],
        SWRfetcher,
        options
    );

    const paginationHandler = (page) => {
        const currentPath = router.pathname;
        const currentQuery = router.query;
        currentQuery.page = page.selected + 1;
        router.push({
            pathname: currentPath,
            query: currentQuery,
        });
    };

    const { searchPosts } = data;
    return (
        <Layout>
            <LayoutContent>
                <div className="flex h-fit w-full flex-auto flex-col md:order-1">
                    <span className="text-3xl font-medium">
                        Hasil Pencarian Kata Kunci : {props.query.q}
                    </span>
                    <span className="text-base font-medium">
                        ditemukan : {props.totalPosts} artikel
                    </span>
                    <ul>
                        {searchPosts?.posts &&
                            searchPosts?.posts.map(
                                ({
                                    _id,
                                    title,
                                    slug,
                                    image,
                                    releaseAt,
                                    category,
                                }) => {
                                    return (
                                        <ListItem
                                            key={_id}
                                            slug={slug}
                                            category={category}
                                            title={title}
                                            releaseAt={releaseAt}
                                            index={_id}
                                            imageUrl={image.url}
                                            imageTitle={image.title}
                                        />
                                    );
                                }
                            )}
                    </ul>
                    {searchPosts?.paginator?.totalPages >= 0 ||
                    searchPosts?.paginator?.totalPages <= 1 ? null : (
                        <div className="mt-2 flex h-fit w-full items-center justify-center bg-neutral-700 p-1">
                            <ReactPaginate
                                previousLabel={"<"}
                                nextLabel={">"}
                                breakLabel={"..."}
                                breakClassName={"break-me"}
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
                <Sidebar>
                    <Popular
                        props={props.Latest.getPostsWithPagination.posts}
                    />
                </Sidebar>
            </LayoutContent>
        </Layout>
    );
};

export default Search;

export async function getServerSideProps({ query }) {
    const Latest = await loadLatest(1, 20, "PUBLISH");
    const data = await loadSearch(query.q);
    return {
        props: {
            Latest,
            fallback: data,
            currentPage: data.searchPosts.paginator.currentPage,
            totalPosts: data.searchPosts.paginator.totalPosts,
            totalPages: data.searchPosts.paginator.totalPages,
            query,
        },
    };
}
