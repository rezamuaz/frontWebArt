import { useState } from "react";
import useSWR from "swr";
import { AddCategoryList } from "@Components/Molecules";
import { Button } from "@Components/Atoms";
import { useModal } from "@Components/Molecules/Modal";
import {
    ADD_CATEGORY,
    All_CATEGORY,
    DELETE_CATEGORY,
} from "@Shared/lib/GraphqlSchema";
import { GraphqlMutation, SWRfetcher } from "@Shared/lib/Request";
import LayoutPanel from "@Components/Templates/LayoutPanel";

// const fetcher = query => request(`${process.env.BACKEND_ACCESS}`, query)
const AddCategory = () => {
    const [category, setCategory] = useState("");
    const options = { revalidateIfStale: true };
    const { data, mutate } = useSWR([All_CATEGORY, {}], SWRfetcher);
    const { showModal } = useModal();

    const ModalContent = (props) => <div>{props.value}</div>;

    function handleModal(e) {
        showModal(ModalContent, {
            value: e,
        });
    }

    const AddedHandler = async (e) => {
        e.preventDefault();
        const variables = {
            newCategory: {
                name: category,
            },
        };
        const data = await GraphqlMutation(ADD_CATEGORY, variables).catch(
            (error) => {
                handleModal(error.response.errors[0].message);
            }
        );
        if (data !== undefined) {
            handleModal("Add Category Success");
            mutate();
        }
    };

    const DeleteHandler = async (e, id) => {
        e.preventDefault();
        const variables = {
            deleteCategoryId: id,
        };
        const data = await GraphqlMutation(DELETE_CATEGORY, variables).catch(
            (error) => {
                alert(`${error.response.errors[0].message}`);
            }
        );
        if (!data) {
            handleModal("Fail to Delete");
        }
        handleModal(data.deleteCategory.message);
        mutate();
    };

    return (
        <LayoutPanel>
            <div className="layer-8 flex h-full w-full pt-14">
                <div className="flex h-full w-[350px] flex-initial flex-col p-4">
                    <div>
                        <input
                            placeholder="Add Category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="layer-9 invert-text h-8 w-80 flex-initial whitespace-nowrap border-0 pl-2 text-base"
                        />
                        <Button
                            title="Add new Category"
                            type="button"
                            className="btn-blue my-2 h-fit w-fit rounded p-1 "
                            onClick={(e) => AddedHandler(e)}
                        />
                    </div>
                    <div className="layer-9 h-full w-80 flex-initial overflow-hidden p-3">
                        <AddCategoryList data={data} handler={DeleteHandler} />
                    </div>
                </div>
            </div>
        </LayoutPanel>
    );
};

export default AddCategory;
