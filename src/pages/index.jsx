import { Category, Latest, Popular } from "@Components/Molecules";
import { Fakeads } from "@Components/Advertisement/fakeads";
import { loadBatchCategory, loadLatest } from "@Shared/lib/Request";
import LayoutContent from "@Components/Templates/LayoutContent";
import { Sidebar } from "@Components/Organism";
import Layout from "@Components/Templates/Layout";
import { NextSeo } from "next-seo";
import RandomList from "@Components/Molecules/Random/RandomList";

export default function Index(props) {
    return (
        <>
            <NextSeo
                title="Horizonindo | Menyajikan Topik Terkini | Horizonindo.com"
                description="web menyajikan topik terkini"
                noindex="true"
                nofollow="true"
                canonical="canonical"
            />
            <Layout>
                <LayoutContent>
                    <div className="content">
                        <Latest
                            list={props.Latest.getPostsWithPagination.posts}
                        />
                        <RandomList
                            props={props.Latest.getPostsWithPagination.posts}
                        />
                        <div className="my-8">
                            {props?.Category?.map((e, i) => (
                                <Category
                                    key={i}
                                    category={e.data.getPostByCategory.posts}
                                />
                            ))}
                        </div>
                    </div>

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

export async function getStaticProps() {
    const Latest = await loadLatest(1, 20, "PUBLISH");
    const categorylist = [
        { name: "market" },
        { name: "bisnis" },
        { name: "nasional" },
        { name: "internasional" },
        { name: "teknologi" },
        { name: "fintech" },
        { name: "lifestyles" },
        { name: "kuliner" },
    ];
    const Category = await loadBatchCategory(categorylist);

    return {
        props: {
            Latest,
            Category,
        },
        revalidate: 60,
    };
}
