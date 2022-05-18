import { Fragment, useContext, useEffect, useState } from "react";
import Tiptap from "@Components/Molecules/Tiptap/Tiptap";
import urlSlug from "url-slug";
import {
    CategorySelector,
    DateRelease,
    FileUpload,
    StatusPost,
    SubmitEdit,
    TagsCreate,
} from "@Components/Molecules";
import { GraphqlQueryAuth } from "@Shared/lib/Request";
import { POST_BY_ID } from "@Shared/lib/GraphqlSchema";
import LayoutPanel from "@Components/Templates/LayoutPanel";
import PostForm from "@Components/Molecules/PostForm";
import SidebarAdmin from "@Components/Organism/SidebarAdmin";

const EditPost = ({ id }) => {
    const initialState = {
        title: "",
        slug: "",
        category: [],
        tags: [],
        image: { url: "", title: "", caption: "" },
        content: "",
        status: "PENDING",
        show: true,
        description: "",
        releaseAt: "",
    };
    const [post, setPost] = useState(initialState);
    const [edit, setEdit] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const variables = {
            getPostByIdOrNameId: id,
            title: null,
            slug: null,
        };
        GraphqlQueryAuth(POST_BY_ID, variables)
            .then(async (res) => {
                setPost(await res.getPostByIdOrName);
            })
            .catch((error) => console.log(error))
            .finally(setLoading(false));
    }, [id]);

    const handleSet = (name) => {
        return ({ target: { value } }) => {
            setPost((oldValues) => ({ ...oldValues, [name]: value }));
        };
    };
    const handleSpecial = (e) => {
        handleChange("title", e);
        handleChange("slug", urlSlug(e));
    };
    const handleChange = (name, value) => {
        return setPost((oldValues) => ({ ...oldValues, [name]: value }));
    };

    const handleEdit = () => {
        setEdit(false);
        setTimeout(() => {
            setEdit(true);
        }, 5000);
    };
    const handleClear = () => {
        setPost(initialState);
    };

    const handleImage = (subname, value) => {
        return setPost((oldValues) => ({
            ...oldValues,
            image: {
                ...oldValues.image,
                [subname]: value,
            },
        }));
    };

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
                <SubmitEdit set={handleChange} post={post} />
                <StatusPost set={handleChange} status={post.status} />
                <CategorySelector set={handleChange} category={post.category} />
                <TagsCreate set={handleChange} tags={post.tags} />
                <DateRelease set={handleChange} date={post.date} />
                <FileUpload
                    set={handleChange}
                    title={post.image.title}
                    url={post.image.url}
                />
            </SidebarAdmin>
        </LayoutPanel>
    );
};

export default EditPost;
export async function getServerSideProps({ params }) {
    return {
        props: { id: params.id },
    };
}
