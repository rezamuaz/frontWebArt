import {
    LatestPage,
    ListPagination,
    PaginationPage,
    Popular,
} from "@Components/Molecules";
import { Sidebar } from "@Components/Organism";
import { LoadingScreen } from "@Components/Templates";
import Layout from "@Components/Templates/Layout";
import LayoutContent from "@Components/Templates/LayoutContent";
import { loadLatest, loadPathTerbaru } from "@Shared/lib/Request";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React from "react";

export default function TerbaruPages(props) {
    const router = useRouter();
    if (router.isFallback) {
        <LoadingScreen />;
    }

    return (
        <>
            <NextSeo
                title={`Terbaru Halaman ${props.currentPage}  | Horizonindo.com`}
                description="Artikel Terbaru"
                noindex="true"
                nofollow="true"
                canonical="canonical"
            />
            <Layout>
                <LayoutContent>
                    <LatestPage props={props} />
                    <Sidebar>
                        <Popular
                            props={props.Latest.getPostsWithPagination.posts}
                        />
                    </Sidebar>
                </LayoutContent>
            </Layout>
        </>
    );
}
export async function getStaticPaths() {
    const data = await loadPathTerbaru(1);
    const { totalPages, totalPosts } = data?.getPostsWithPagination.paginator;
    const paths = [];
    /**
     * Start from page 2, so we don't replicate /blog
     * which is page 1
     */
    for (let page = 1; page <= totalPages; page++) {
        paths.push({ params: { page: page.toString() } });
    }

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false };
}

export const getStaticProps = async ({ params, res }) => {
    const data = await loadPathTerbaru(params.page);
    const Latest = await loadLatest(1, 20, "PUBLISH");
    const { totalPosts, totalPages, currentPage, perPage } =
        data?.getPostsWithPagination.paginator;
    const { posts } = data?.getPostsWithPagination;
    return {
        props: {
            Latest,
            totalPosts,
            totalPages,
            currentPage,
            perPage,
            posts,
        },
        revalidate: 60,
    };
};
