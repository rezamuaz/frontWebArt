import { ListPagination, Popular } from "@Components/Molecules";
import { Sidebar } from "@Components/Organism";
import Layout from "@Components/Templates/Layout";
import LayoutContent from "@Components/Templates/LayoutContent";
import { POST_CATEGORY } from "@Shared/lib/GraphqlSchema";
import {
    loadCategory,
    loadLatest,
    loadMetadata,
    SWRfetcher,
} from "@Shared/lib/Request";
import { NextSeo } from "next-seo";
import useSWR from "swr";

const CategoryPage = (props) => {
    const options = {
        fallbackData: props.fallback,
    };
    const variables = {
        page: Number(props.query.page),
        limit: null,
        categoryName: props.params.category,
        categoryId: null,
    };
    const { data, isValidating } = useSWR(
        [POST_CATEGORY, variables],
        SWRfetcher,
        options
    );

    return (
        <>
            <NextSeo
                title={`${props.params.category.replace(
                    /-/g,
                    " "
                )}  | Horizonindo.com`}
                description={`${props.params.category.replace(/-/g, " ")}`}
                noindex="true"
                nofollow="true"
                canonical="canonical"
            />
            <Layout menu={props.menuitem?.getMetadata?.menu}>
                <LayoutContent>
                    <ListPagination props={data?.getPostByCategory} />
                    <Sidebar>
                        <Popular
                            props={props.Latest.getPostsWithPagination.posts}
                        />
                    </Sidebar>
                </LayoutContent>
            </Layout>
        </>
    );
};
export default CategoryPage;

export async function getServerSideProps({ params, query, res }) {
    res.setHeader(
        "Cache-Control",
        "public, s-maxage=31536000, stale-while-revalidate=59"
    );
    const data = await loadCategory(params.category, query.page);
    const { getPostByCategory } = data;
    const Latest = await loadLatest(1, 20, "PUBLISH");
    return {
        props: {
            Latest,
            fallback: data,
            posts: getPostByCategory.posts,
            currentPage: getPostByCategory.paginator.currentPage,
            totalPosts: getPostByCategory.paginator.totalPosts,
            totalPages: getPostByCategory.paginator.totalPages,
            params,
            query,
        },
    };
}
