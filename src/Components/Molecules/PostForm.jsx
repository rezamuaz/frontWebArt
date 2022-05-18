import { Button, Input } from "@Components/Atoms";
import React, { Fragment } from "react";
import { Tiptap } from "./Tiptap";

const PostForm = ({
    handleChange,
    handleSpecial,
    handleClear,
    handleEdit,
    handleImage,
    post,
    edit,
}) => {
    return (
        <Fragment>
            <Input
                type="text"
                placeholder="Post Title"
                value={post.title}
                onChange={(e) => handleSpecial(e.target.value)}
                className="my-2 h-fit w-full p-2"
            />
            <div className="inline-flex h-8 w-full items-center">
                <Input
                    disabled={edit}
                    placeholder="Slug"
                    value={post.slug}
                    onChange={(e) => handleChange("slug", e.target.value)}
                    className="h-full w-1/2 flex-auto"
                />
                <Button
                    title={edit ? "Edit Slug" : "Accept"}
                    type="button"
                    className="btn-blue ml-2 h-full w-fit flex-initial rounded border-0 px-2"
                    onClick={handleEdit}
                />
            </div>
            <div className="mx-auto my-4 h-fit w-1/2">
                <Input
                    placeholder="Image Caption"
                    value={post.image.caption}
                    onChange={(e) => handleImage("caption", e.target.value)}
                    className="h-fit w-full p-1 text-base"
                />
            </div>
            {post.content && <Tiptap text={post.content} set={handleChange} />}
            <div className="my-1 h-fit w-full py-2">
                <Input
                    placeholder="Post Description"
                    value={post.description}
                    onChange={(e) =>
                        handleChange("description", e.target.value)
                    }
                    className="h-fit w-full p-1"
                />
            </div>

            <Button
                title="Clear"
                className="btn-red mt-2 h-fit w-fit rounded"
                onClick={handleClear}
            />
        </Fragment>
    );
};

export default PostForm;
