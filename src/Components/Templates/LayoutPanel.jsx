import { AdminHeader, AdminNavbar } from "@Components/Organism";
import Head from "next/head";
import React, { Fragment, useState } from "react";

const LayoutPanel = ({ children, page, title }) => {
    const [show, setShow] = useState(false);
    function handleShow() {
        setShow(!show);
    }
    return (
        <Fragment>
            <Head>
                <title>{title}</title>
                <meta
                    property="og:title"
                    content="My page title"
                    key="title"
                    name="description"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="layer-9 my-2 flex h-screen w-full flex-col overflow-y-scroll md:my-0 lg:flex-row">
                <AdminHeader handleShow={handleShow} />
                <AdminNavbar page={page} show={show} />
                {children}
            </main>
        </Fragment>
    );
};

export default LayoutPanel;
