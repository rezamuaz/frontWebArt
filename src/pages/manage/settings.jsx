import { AdminNavbar } from "@Components/Organism";
import React, { useCallback, useEffect, useState } from "react";
import { moveItemIndex } from "@Shared/lib/helper";
import { useModal } from "@Components/Molecules/Modal";
import { GraphqlMutation, loadMetadata } from "@Shared/lib/Request";
import { META_MENU_UPDATE } from "@Shared/lib/GraphqlSchema";
import {
    RiAddCircleLine,
    RiArrowDownSFill,
    RiArrowUpSFill,
    RiCloseFill,
    RiEditBoxLine,
    RiSave3Line,
} from "src/Assets/RemixIcon";
import LayoutPanel from "@Components/Templates/LayoutPanel";

const settings = () => {
    const [data, setData] = useState();
    const [edit, setEdit] = useState(true);
    const { showModal } = useModal();

    const ModalContent = (props) => <div>{props.value}</div>;
    function handleModal(e) {
        showModal(ModalContent, {
            value: e,
        });
    }

    useEffect(() => {
        let isSubscribed = true;
        const fetchData = async () => {
            const data = await loadMetadata();
            const { getMetadata } = await data;
            if (isSubscribed) {
                setData(getMetadata.menu);
            }
        };
        fetchData().catch((error) => console.log(error));
        return () => (isSubscribed = false);
    }, []);

    async function handleCursor(e, currentIndex, moveIndex) {
        e.preventDefault();
        const newArr = await moveItemIndex([...data], currentIndex, moveIndex);
        setData(newArr);
    }

    async function handleEdit() {
        setEdit(false);
    }
    async function handleSet(name, index, value) {
        let temp = await data.map((item, i) =>
            i === index ? { ...item, [name]: value.toLowerCase() } : item
        );
        setData(temp);
    }
    async function handleAdd() {
        let temp = await data.slice();
        temp.unshift({ name: "menu", slug: "/slug" }), setData(temp);
    }

    async function handleDelete(e, i) {
        e.preventDefault();
        let temp = [...data];
        temp.splice(i, 1);
        setData(temp);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const variables = {
            updateMenuId: "627271cc9daacca09289920a",
            updateMenu: [...data],
        };
        const res = await GraphqlMutation(META_MENU_UPDATE, variables).catch(
            (error) => handleModal(error.response.errors[0].message)
        );
        if (res) {
            handleModal("Update Success");
            setEdit(true);
        }
    }

    return (
        <LayoutPanel>
            <div className="layer-8 flex h-screen w-full px-8 pt-14">
                <div className="l overflow-y-scrol m-2 flex h-full w-fit flex-col flex-wrap items-start">
                    <div className="mx-auto my-4 inline-flex h-fit w-40 items-center justify-around rounded-md border-[1px] border-dashed border-zinc-700 p-2 text-center dark:border-zinc-200">
                        <div className="mx-auto text-sm">
                            <RiAddCircleLine
                                className="h-10 w-10 cursor-pointer text-green-600"
                                type="button"
                                title="add menu"
                                onClick={handleAdd}
                            />
                            Add
                        </div>
                        {edit ? (
                            <div className="mx-auto text-sm">
                                <RiEditBoxLine
                                    className="h-10 w-10 cursor-pointer text-green-600"
                                    type="button"
                                    title="edit"
                                    onClick={handleEdit}
                                />
                                Edit
                            </div>
                        ) : (
                            <div className="mx-auto text-sm">
                                <RiSave3Line
                                    className="h-10 w-10 cursor-pointer text-green-600"
                                    type="button"
                                    title="save"
                                    onClick={(e) => handleSubmit(e)}
                                />
                                Save
                            </div>
                        )}
                    </div>

                    {data &&
                        data.map((e, i) => {
                            return (
                                <div
                                    className="layer-9 relative mx-1 my-3 flex w-fit flex-col rounded-md p-2"
                                    key={i}
                                >
                                    <button
                                        type="button"
                                        title="delete"
                                        className="layer-9 absolute -top-5 right-0 rounded-tl rounded-tr p-1"
                                        onClick={(e) => handleDelete(e, i)}
                                    >
                                        <RiCloseFill className="h-5 w-5 text-red-600" />
                                    </button>
                                    <div className="inline-flex justify-evenly py-1">
                                        <button
                                            type="button"
                                            className={`${
                                                i === 0
                                                    ? "invisible"
                                                    : "visible"
                                            } mr-2 rounded bg-green-200 text-green-600 dark:bg-green-600 dark:text-white`}
                                            onClick={(e) =>
                                                handleCursor(e, i, i - 1)
                                            }
                                        >
                                            <RiArrowUpSFill />
                                        </button>
                                        <input
                                            disabled={edit}
                                            className="p-1 "
                                            value={e.name}
                                            placeholder="name"
                                            onChange={(e) =>
                                                handleSet(
                                                    "name",
                                                    i,
                                                    e.target.value
                                                )
                                            }
                                        ></input>
                                    </div>
                                    <div className="inline-flex justify-evenly py-1">
                                        <button
                                            type="button"
                                            disable
                                            onClick={(e) =>
                                                handleCursor(e, i, i + 1)
                                            }
                                            className={`${
                                                i === data.length - 1
                                                    ? "invisible"
                                                    : "visible"
                                            } mr-2 rounded bg-green-200 text-green-600 dark:bg-green-600 dark:text-white`}
                                        >
                                            <RiArrowDownSFill />
                                        </button>
                                        <input
                                            disabled={edit}
                                            className="p-1"
                                            value={e.slug}
                                            placeholder="slug"
                                            onChange={(e) =>
                                                handleSet(
                                                    "slug",
                                                    i,
                                                    e.target.value
                                                )
                                            }
                                        ></input>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </LayoutPanel>
    );
};

export default settings;
