import { useContext, useEffect, useState } from "react";
import { LoadingScreen } from "@Components/Templates";
import { Button } from "@Components/Atoms";

export default function FileUpload({ url, title, set }) {
    const [loading, setLoading] = useState();
    const [imageSrc, setImageSrc] = useState();
    const [uploadData, setUploadData] = useState();

    useEffect(() => {
        setImageSrc(url);
    }, [url]);

    /**
     * handleOnChange
     * @description Triggers when the file input changes (ex: when a file is selected)
     */

    function handleOnChange(changeEvent) {
        const reader = new FileReader();

        reader.onload = function (onLoadEvent) {
            setImageSrc(onLoadEvent.target.result);
            setUploadData(undefined);
        };

        reader.readAsDataURL(changeEvent.target.files[0]);
    }

    /**
     * handleOnSubmit
     * @description Triggers when the main form is submitted
     */

    async function handleOnSubmit(event) {
        event.preventDefault();

        const form = event.currentTarget;
        const fileInput = Array.from(form.elements).find(
            ({ name }) => name === "file"
        );

        const formData = new FormData();

        for (const file of fileInput.files) {
            formData.append("file", file);
        }

        formData.append("upload_preset", "ojyyca5m");

        try {
            setLoading(true);
            const data = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            ).then((r) => r.json());
            if (data !== null || data !== undefined) {
                set(data.secure_url);
            }
            setImageSrc(data.secure_url);
            setUploadData(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <main className="custom-border flex w-full flex-col items-center justify-center border-[2px] border-dashed p-2 text-center text-sm font-light">
            <p className="my-1 leading-6">Upload image!</p>
            <input
                className=" my-1 w-full rounded-[2px] border-[1px] px-2"
                placeholder="image title"
                value={title}
                onChange={(e) => set("title", e.target.value.toLowerCase())}
            />
            <input
                className=" my-1 w-full rounded-[2px] border-[1px] px-2"
                placeholder="image url"
                value={url}
                onChange={(e) => set("url", e.target.value.toLowerCase())}
            />
            <form
                className="flex flex-col items-center justify-center"
                method="post"
                onChange={handleOnChange}
                onSubmit={handleOnSubmit}
            >
                <input
                    type="file"
                    name="file"
                    className="my-1 w-full rounded-[2px] border-[1px] p-2"
                />
                {loading ? <LoadingScreen /> : null}
                <img className="h-min w-full py-1" src={imageSrc} />

                {imageSrc && !uploadData && (
                    <p>
                        <Button
                            title="Upload File"
                            className="btn-green my-1 rounded-md border-none px-2 py-1 text-base"
                        />
                    </p>
                )}
            </form>
        </main>
    );
}
