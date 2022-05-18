import { useState } from "react";
import { Button } from "@Components/Atoms";
import { useModal } from "./Modal";
import { GraphqlMutation } from "@Shared/lib/Request";
import { POST_UPDATE } from "@Shared/lib/GraphqlSchema";

const SubmitEdit = ({ post }) => {
    const [show, setShow] = useState(false);
    const { showModal, hideModal } = useModal();

    const ModalContent = (props) => <div>{props.value}</div>;
    function handleModal(e) {
        showModal(ModalContent, {
            value: e,
        });
    }

    async function SubmitHandler() {
        try {
            const {
                _id,
                title,
                slug,
                image,
                category,
                tags,
                content,
                status,
                show,
                description,
                releaseAt,
            } = post;
            const text = releaseAt === "" ? new Date() : releaseAt;
            const Variables = {
                update: {
                    title: title,
                    slug: slug,
                    image: image,
                    category: category,
                    tags: tags,
                    content: content,
                    status: status,
                    show: show,
                    description: description,
                    releaseAt: text,
                },
                updatePostId: _id,
            };
            let data = await GraphqlMutation(POST_UPDATE, Variables);
            handleModal("Update Successfully");
            setTimeout(() => {
                hideModal;
            }, 2000);
        } catch {
            (error) => {
                alert(`${error.response.errors[0].message}`);
            };
        }
    }

    return (
        <div className="mx-auto h-fit w-full rounded-lg text-base">
            <div className="mt-4 flex flex-col">
                <Button
                    title="Edit/Save"
                    onClick={SubmitHandler}
                    disabled={show}
                    type="button"
                    className="btn-blue h-min w-full py-2 font-semibold text-white"
                />
            </div>
        </div>
    );
};
export default SubmitEdit;
