import React, { useMemo, useState } from "react";
import {
    useTable,
    useFilters,
    useGlobalFilter,
    useAsyncDebounce,
    useSortBy,
    usePagination,
    useTableInstance,
} from "react-table";
import { Button, PageButton } from "./Button";
import { classNames } from "@Shared/utils/Utils";
import { SortIcon, SortUpIcon, SortDownIcon } from "./Icons";
import {
    HiChevronLeftDoubleLine,
    HiChevronLeftLine,
    HiChevronRightDoubleLine,
    HiChevronRightLine,
    RiDeleteBin2Fill,
    RiUserLine,
} from "src/Assets/RemixIcon";
import { useRouter } from "next/router";
import { TimePostedDateOnly } from "@Shared/lib/helper";

// Define a default UI for filtering
function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = useState(globalFilter);
    const onChange = useAsyncDebounce((value) => {
        setGlobalFilter(value || undefined);
    }, 200);

    return (
        <label className="flex items-baseline gap-x-2">
            <span>Search: </span>
            <input
                type="text"
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={value || ""}
                onChange={(e) => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={`${count} records...`}
            />
        </label>
    );
}

// This is a custom filter UI for selecting
// a unique option from a list
export function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id, render },
}) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = useMemo(() => {
        const options = new Set();
        preFilteredRows.forEach((row) => {
            options.add(row.values[id]);
        });
        return [...options.values()];
    }, [id, preFilteredRows]);

    // Render a multi-select box
    return (
        <label className="flex items-baseline gap-x-2">
            <span className="text-gray-700">{render("Header")}: </span>
            <select
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                name={id}
                id={id}
                value={filterValue}
                onChange={(e) => {
                    setFilter(e.target.value || undefined);
                }}
            >
                <option value="">All</option>
                {options.map((option, i) => (
                    <option key={i} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </label>
    );
}

function Table({
    columns,
    data,
    paginate,
    onPrevPage,
    onNextPage,
    handlePerPage,
    setStatus,
    status,
}) {
    const router = useRouter();

    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,

        state,
        preGlobalFilteredRows,
        setGlobalFilter,
    } = useTable(
        {
            columns,
            data,
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    // Render the UI for your table
    return (
        <>
            <div className="inline-flex sm:flex sm:gap-x-2">
                <GlobalFilter
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={state.globalFilter}
                    setGlobalFilter={setGlobalFilter}
                />
                {headerGroups.map((headerGroup) =>
                    headerGroup.headers.map((column) =>
                        column.Filter ? (
                            <div className="mt-2 sm:mt-0" key={column.id}>
                                {column.render("Filter")}
                            </div>
                        ) : null
                    )
                )}
                {router.pathname === "/post/list" && (
                    <select
                        className="layer-9 block w-full rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        value={status}
                        onChange={(e) => {
                            setStatus(String(e.target.value));
                        }}
                    >
                        {["PUBLISH", "PENDING", "DRAF"].map((postStatus) => (
                            <option key={postStatus} value={postStatus}>
                                Status: {postStatus}
                            </option>
                        ))}
                    </select>
                )}
            </div>
            {/* table */}
            <div className="mt-4 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="invert-text h-fit overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                            <table
                                {...getTableProps()}
                                className="min-w-full divide-y divide-gray-200"
                            >
                                <thead className="layer-9">
                                    {headerGroups.map((headerGroup, i) => (
                                        <tr
                                            key={i}
                                            {...headerGroup.getHeaderGroupProps()}
                                        >
                                            {headerGroup.headers.map(
                                                (column, i) => (
                                                    // Add the sorting props to control sorting. For this example
                                                    // we can add them into the header props
                                                    <th
                                                        key={i}
                                                        scope="col"
                                                        className="group px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                                                        {...column.getHeaderProps(
                                                            column.getSortByToggleProps()
                                                        )}
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            {column.render(
                                                                "Header"
                                                            )}
                                                            {/* Add a sort direction indicator */}
                                                            <span>
                                                                {column.isSorted ? (
                                                                    column.isSortedDesc ? (
                                                                        <SortDownIcon className="h-4 w-4 text-gray-400" />
                                                                    ) : (
                                                                        <SortUpIcon className="h-4 w-4 text-gray-400" />
                                                                    )
                                                                ) : (
                                                                    <SortIcon className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100" />
                                                                )}
                                                            </span>
                                                        </div>
                                                    </th>
                                                )
                                            )}
                                        </tr>
                                    ))}
                                </thead>
                                <tbody
                                    {...getTableBodyProps()}
                                    className="layer-9 divide-y divide-gray-200"
                                >
                                    {page.map((row, i) => {
                                        // new
                                        prepareRow(row);
                                        return (
                                            <tr {...row.getRowProps()}>
                                                {row.cells.map((cell, i) => {
                                                    return (
                                                        <td
                                                            key={i}
                                                            {...cell.getCellProps()}
                                                            className="whitespace-nowrap px-4 py-3"
                                                            role="cell"
                                                        >
                                                            {cell.column.Cell
                                                                .name ===
                                                            "defaultRenderer" ? (
                                                                <div className="text-sm text-gray-500">
                                                                    {cell.render(
                                                                        "Cell"
                                                                    )}
                                                                </div>
                                                            ) : (
                                                                cell.render(
                                                                    "Cell"
                                                                )
                                                            )}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {/* Pagination */}
            {router.pathname !== "/manage/user" && (
                <div className="flex items-center justify-between py-3">
                    <div className="flex flex-1 justify-between sm:hidden">
                        <Button
                            onClick={() => previousPage()}
                            disabled={!canPreviousPage}
                        >
                            Previous
                        </Button>
                        <Button
                            onClick={() => nextPage()}
                            disabled={!canNextPage}
                        >
                            Next
                        </Button>
                    </div>
                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                        <div className="flex items-baseline gap-x-2">
                            <span className="text-sm">
                                Page{" "}
                                <span className="font-medium">
                                    {paginate?.currentPage}
                                </span>{" "}
                                of{" "}
                                <span className="font-medium">
                                    {paginate?.totalPages}
                                </span>
                            </span>
                            <label>
                                <span className="sr-only">Items Per Page</span>
                                <select
                                    className="layer-9 mt-1 block w-full rounded-md p-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    value={state.pageSize}
                                    onChange={(e) => {
                                        handlePerPage(Number(e.target.value));
                                        setPageSize(Number(e.target.value));
                                    }}
                                >
                                    {[5, 10, 20].map((pageSize) => (
                                        <option key={pageSize} value={pageSize}>
                                            Show {pageSize}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>
                        <div>
                            <nav
                                className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
                                aria-label="Pagination"
                            >
                                <PageButton
                                    className="rounded-l-md"
                                    onClick={() => gotoPage(0)}
                                    disabled={!canPreviousPage}
                                >
                                    <span className="sr-only">First</span>
                                    <HiChevronLeftDoubleLine
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </PageButton>
                                <PageButton
                                    onClick={onPrevPage}
                                    disabled={!paginate?.hasPrevPage}
                                >
                                    <span className="sr-only">Previous</span>
                                    <HiChevronLeftLine
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </PageButton>
                                <PageButton
                                    onClick={onNextPage}
                                    disabled={!paginate?.hasNextPage}
                                >
                                    <span className="sr-only">Next</span>
                                    <HiChevronRightLine
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </PageButton>
                                <PageButton
                                    className="rounded-r-md"
                                    onClick={() => gotoPage(pageCount - 1)}
                                    disabled={!canNextPage}
                                >
                                    <span className="sr-only">Last</span>
                                    <HiChevronRightDoubleLine
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </PageButton>
                            </nav>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Table;
