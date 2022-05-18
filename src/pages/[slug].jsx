import { useRouter } from "next/router";
import LoadingScreen from "@Components/Templates/LoadingScreen";
import { Article, Popular, QuickEdit } from "@Components/Molecules";
import { useAuthState } from "@Context/AuthContext";
import {
    loadAllPost,
    loadLatest,
    loadMetadata,
    loadSinglePost,
} from "@Shared/lib/Request";
import LayoutContent from "@Components/Templates/LayoutContent";
import StickyAds from "@Components/Advertisement/StickyAds";
import { Fakeads } from "@Components/Advertisement/fakeads";
import { Sidebar } from "@Components/Organism";
import Layout from "@Components/Templates/Layout";
import { NextSeo } from "next-seo";
import { useAnalytics } from "use-analytics";
import { useEffect, useState } from "react";

const Post = (props) => {
    const [url, setUrl] = useState();
    const { authenticated } = useAuthState();
    const { page } = useAnalytics();
    const router = useRouter();
    if (router.isFallback) {
        return <LoadingScreen />;
    }

    // useEffect(() => {
    //     router.isReady;
    //     const getUrl = async () => {
    //         if (typeof window !== "undefined") {
    //             const hostname = window.location.hostname;
    //             const baseUrl = `https://${hostname}`;
    //             setUrl(`${baseUrl}${router.asPath}`);
    //         }
    //     };
    //     getUrl();
    //     page();
    // }, [router.asPath]);

    return (
        <>
            <NextSeo
                title={`${props.data.getPostByIdOrName.title}  | Horizonindo.com`}
                description={`${props.data.getPostByIdOrName.description}`}
                noindex="true"
                nofollow="true"
                canonical={`${url}`}
            />
            <Layout>
                <LayoutContent>
                    {authenticated && (
                        <QuickEdit route={props.data.getPostByIdOrName._id} />
                    )}
                    <Article props={props} />
                    <Sidebar>
                        <Popular
                            props={props.Latest.getPostsWithPagination.posts}
                        />
                        <StickyAds ads={<Fakeads />} />
                    </Sidebar>
                </LayoutContent>
            </Layout>
        </>
    );
};
export default Post;

export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const data = await loadAllPost();
    const { allPost } = data;
    // Get the paths we want to pre-render based on posts
    const paths = allPost.map((post) => ({
        params: { slug: String(post.slug) },
    }));
    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const menuitem = await loadMetadata();
    const data = await loadSinglePost(params.slug);
    const Latest = await loadLatest(1, 20, "PUBLISH");
    return { props: { data, Latest, menuitem }, revalidate: 3000 };
}
