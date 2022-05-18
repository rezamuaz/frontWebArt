import { ListPagination, Popular } from "@Components/Molecules";
import { Sidebar } from "@Components/Organism";
import Layout from "@Components/Templates/Layout";
import LayoutContent from "@Components/Templates/LayoutContent";
import { POST_TAGS } from "@Shared/lib/GraphqlSchema";
import {
    loadLatest,
    loadMetadata,
    loadTags,
    SWRfetcher,
} from "@Shared/lib/Request";
import { NextSeo } from "next-seo";
import useSWR from "swr";

const TagsPage = (props) => {
    const options = {
        fallbackData: props.data,
    };
    const variables = {
        page: Number(props.params.page),
        limit: null,
        tags: props.query.tag,
    };
    const { data, isValidating } = useSWR(
        [POST_TAGS, variables],
        SWRfetcher,
        options
    );
    return (
        <>
            <NextSeo
                title={`${props.params.tag.replace(
                    /-/g,
                    " "
                )}  | Horizonindo.com`}
                description={`${props.params.tag.replace(/-/g, " ")}`}
                noindex="true"
                nofollow="true"
                canonical="canonical"
            />
            <Layout>
                <LayoutContent>
                    <ListPagination props={data?.getPostByTags} />
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
export default TagsPage;

export async function getServerSideProps({ params, query, res }) {
    res.setHeader(
        "Cache-Control",
        "public, s-maxage=31536000, stale-while-revalidate=59"
    );
    const data = await loadTags(params.tag, null, query.page);
    const { getPostByTags } = await data;
    const Latest = await loadLatest(1, 20, "PUBLISH");

    // Pass post data to the page via props
    return {
        props: {
            data,
            Latest,
            currentPage: getPostByTags.paginator.currentPage,
            totalPosts: getPostByTags.paginator.totalPosts,
            totalPages: getPostByTags.paginator.totalPages,
            params,
            query,
        },
    };
}
