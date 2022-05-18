import { Fragment, useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useModal } from "@Components/Molecules/Modal";
import { POST_DELETE, POST_NO_CONTENT } from "@Shared/lib/GraphqlSchema";
import { GraphqlMutation, SWRfetcher } from "@Shared/lib/Request";
import { RiDeleteBin2Fill, RiEdit2Fill } from "src/Assets/RemixIcon";

import LayoutPanel from "@Components/Templates/LayoutPanel";
import Table from "@Components/Molecules/Table/Table";
import {
    ShortTitle,
    ShowDate,
    StatusPill,
} from "@Components/Molecules/Table/Column";

const List = () => {
    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [paginat, setPaginat] = useState();
    const [status, setStatus] = useState("PUBLISH");
    const router = useRouter();
    const { showModal } = useModal();

    // fetch Data with SWR
    const variables = {
        page: page,
        limit: perPage,
        status: status,
    };
    const {
        data: main,
        mutate,
        isValidating,
    } = useSWR([POST_NO_CONTENT, variables], SWRfetcher, {
        revalidateIfStale: true,
        revalidateOnMount: true,
        revalidateOnFocus: true,
        shouldRetryOnError: true,
    });

    // handle Modal
    const ModalContent = (props) => <div>{props.value}</div>;
    function handleModal(e) {
        showModal(ModalContent, {
            value: e,
        });
    }

    // handle Page Pagination
    const onNextPage = () => setPage(page + 1);
    const onPrevPage = () => setPage(page - 1);
    const handlePerPage = (newPerPage) => {
        setPerPage(newPerPage);
    };

    // handle Table Action
    async function handlleDelete(e, id) {
        e.preventDefault();
        const variables = { deletePostId: id };
        let data = await GraphqlMutation(POST_DELETE, variables).catch(
            (Error) => handleModal(Error.response.errors[0].message)
        );
        if (data !== null || data !== undefined) {
            handleModal(data?.deletePost.message);
            mutate();
        }
    }

    function handleEdit(e, id) {
        e.preventDefault();
        router.push({ pathname: "/post/[id]", query: { id: id } });
    }

    useEffect(() => {
        setPaginat(main?.getPostsWithPagination?.paginator);
    }, [isValidating, perPage, page, status, handlleDelete]);

    const columns = useMemo(() => [
        {
            Header: "Title",
            accessor: "title",
            Cell: ShortTitle,
        },
        {
            Header: "Relase At",
            accessor: "releaseAt",
            Cell: ShowDate,
        },

        {
            Header: "Author",
            accessor: (row) => {
                let name = [];
                Object.values(row?.author).forEach((val) => {
                    name.push(val);
                });
                return name.join(" ");
            },
        },
        {
            Header: "category",
            accessor: (row) => {
                let category = [];
                row.category?.map((item) => {
                    category.push(item.name);
                });
                return category.join(", ");
            },
        },

        {
            Header: "Status",
            accessor: "status",
            Cell: StatusPill,
        },
        {
            Header: "Edit",
            Cell: ({ row }) => (
                <button className="flex h-fit w-full justify-center text-green-600">
                    <RiEdit2Fill
                        className="h-5 w-5"
                        type="button"
                        onClick={(e) => handleEdit(e, row.original._id)}
                    />
                </button>
            ),
        },
        {
            Header: "Delete",
            Cell: ({ row }) => (
                <button className="flex h-fit w-full justify-center text-red-600">
                    <RiDeleteBin2Fill
                        className="h-5 w-5"
                        onClick={(e) => handlleDelete(e, row.original._id)}
                    />
                </button>
            ),
        },
    ]);

    return (
        <LayoutPanel>
            <div className="layer-8 flex h-screen w-full flex-auto flex-col items-center justify-center pt-14">
                <div className="form-color mx-auto h-full max-w-5xl overflow-y-scroll px-4 pt-4 scrollbar-hide sm:px-6 lg:px-8">
                    <Table
                        columns={columns}
                        data={main?.getPostsWithPagination?.posts || []}
                        paginate={paginat}
                        onNextPage={onNextPage}
                        onPrevPage={onPrevPage}
                        handlePerPage={handlePerPage}
                        setStatus={setStatus}
                        status={status}
                    />
                </div>
            </div>
        </LayoutPanel>
    );
};

export default List;
