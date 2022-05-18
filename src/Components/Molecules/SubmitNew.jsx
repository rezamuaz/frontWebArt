import { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@Components/Atoms";
import { GraphqlMutation } from "@Shared/lib/Request";
import { POST_CREATE } from "@Shared/lib/GraphqlSchema";

const SubmitNew = ({ post, handleModal }) => {
    const router = useRouter();

    const SubmitHandler = async () => {
        const {
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
            newPost: {
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
        };
        let data = await GraphqlMutation(POST_CREATE, Variables).catch(
            (error) => {
                console.log(error);
                handleModal(error.response.errors[0].message);
            }
        );
        if (data !== undefined) {
            console.log(data);
            const url = data?.createPost?._id;
            setTimeout(() => {
                router.push({ pathname: "/post/[id]", query: { id: url } });
            }, 2000);
        }
    };

    return (
        <div className="mx-auto h-fit w-full rounded-lg text-base">
            <div className="mt-4 flex flex-col">
                <Button
                    type="submit"
                    title="Post"
                    className="btn-blue h-min w-full py-2 font-semibold"
                    onClick={SubmitHandler}
                />
            </div>
        </div>
    );
};
export default SubmitNew;
