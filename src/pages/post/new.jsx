import { Fragment, useContext, useEffect, useState } from "react";
import urlSlug from "url-slug";
import { useModal } from "@Components/Molecules/Modal";
import LayoutPanel from "@Components/Templates/LayoutPanel";
import PostForm from "@Components/Molecules/PostForm";
import {
    CategorySelector,
    DateRelease,
    FileUpload,
    StatusPost,
    SubmitNew,
    TagsCreate,
} from "@Components/Molecules";
import SidebarAdmin from "@Components/Organism/SIdebarAdmin";

const newPost = () => {
    const initialState = {
        title: "",
        slug: "",
        category: [],
        tags: [],
        image: { url: "", title: "", caption: "" },
        content: "text here",
        status: "PENDING",
        show: true,
        description: "",
        releaseAt: "",
    };
    const [post, setPost] = useState(initialState);
    const [edit, setEdit] = useState(true);
    const { showModal, hideModal } = useModal();

    function handleSet(name) {
        return ({ target: { value } }) => {
            setPost((oldValues) => ({ ...oldValues, [name]: value }));
        };
    }
    function handleSpecial(e) {
        handleChange("title", e);
        handleChange("slug", urlSlug(e));
    }
    function handleChange(name, value) {
        return setPost((oldValues) => ({ ...oldValues, [name]: value }));
    }

    function handleImage(subname, value) {
        return setPost((oldValues) => ({
            ...oldValues,
            image: {
                ...oldValues.image,
                [subname]: value,
            },
        }));
    }

    const handleEdit = () => {
        setEdit(false);
        setTimeout(() => {
            setEdit(true);
        }, 5000);
    };
    function handleClear() {
        setPost(initialState);
    }

    const ModalContent = (props) => <div>{props.value}</div>;
    function handleModal(e) {
        showModal(ModalContent, {
            value: e,
        });
    }
    return (
        <LayoutPanel>
            <div className="form-color h-full w-full flex-auto flex-col px-8 pb-4 pt-12">
                <PostForm
                    handleSpecial={handleSpecial}
                    handleChange={handleChange}
                    handleClear={handleClear}
                    handleImage={handleImage}
                    handleEdit={handleEdit}
                    handleSet={handleSet}
                    post={post}
                    edit={edit}
                />
            </div>
            <SidebarAdmin>
                <SubmitNew
                    set={handleChange}
                    handleModal={handleModal}
                    post={post}
                />
                <StatusPost set={handleChange} status={post.status} />
                <CategorySelector set={handleChange} category={post.category} />
                <TagsCreate set={handleChange} tags={post.tags} />
                <DateRelease set={handleChange} date={post.date} />
                <FileUpload
                    set={handleImage}
                    title={post.image.title}
                    url={post.image.url}
                />
            </SidebarAdmin>
        </LayoutPanel>
    );
};

export default newPost;
