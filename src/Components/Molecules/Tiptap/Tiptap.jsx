import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Toolbar from "./Toolbar";

const Tiptap = ({ text, set }) => {
    const editor = useEditor({
        content: `${text ? text : "type text here"}`,
        extensions: [
            StarterKit,
            Link.configure({
                openOnClick: false,
            }),
            Image,
        ],
        editorProps: {
            attributes: {
                class: "prose prose-sm sm:prose lg:prose-lg m-5 focus:outline-none dark:prose-invert",
            },
        },
        enableInputRules: true,
        onUpdate({ editor }) {
            return set("content", editor.getHTML());
        },
    });

    return (
        <div className="layer-9 h-fit w-full border-2 p-2 ">
            <Toolbar editor={editor} />
            <EditorContent
                className="h-56 w-full overflow-y-scroll border-2"
                editor={editor}
            />
        </div>
    );
};
export default Tiptap;
