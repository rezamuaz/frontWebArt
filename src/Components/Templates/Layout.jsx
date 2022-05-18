import { Footer, Header, Navigation } from "@Components/Organism";
import { METADATA_GET } from "@Shared/lib/GraphqlSchema";
import { loadMetadata, SWRfetcher } from "@Shared/lib/Request";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { NextSeo } from "next-seo";

export default function Layout({ children }) {
    const [meta, setMeta] = useState();
    const { data, error } = useSWR(METADATA_GET, SWRfetcher, {
        fallbackData: meta,
    });

    useEffect(() => {
        let isSubscribed = true;
        async function getMeta() {
            const metadata = await loadMetadata();
            // set state with the result if `isSubscribed` is true
            if (isSubscribed) {
                setMeta(metadata);
            }
        }
        getMeta().catch(console.error);
        // cancel any future `setData`
        return () => (isSubscribed = false);
    }, []);
    return (
        <>
            <NextSeo
                additionalLinkTags={[{ rel: "icon", href: "/horizon.ico" }]}
            />
            <Header menu={data?.getMetadata.menu} />
            <Navigation menu={data?.getMetadata.menu} />
            {children}
            <Footer />
        </>
    );
}
