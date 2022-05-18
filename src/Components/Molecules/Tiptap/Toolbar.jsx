import { useCallback } from "react";
import { setLink } from "./helpers";
import {
    RiArrowGoBackLine,
    RiArrowGoForwardLine,
    RiBold,
    RiCodeBoxLine,
    RiCodeSSlashLine,
    RiDoubleQuotesLt,
    RiEmotionLine,
    RiFormatClear,
    RiH1,
    RiH2,
    RiH3,
    RiH4,
    RiH5,
    RiH6,
    RiImageLine,
    RiItalic,
    RiLink,
    RiLinkUnlink,
    RiListOrdered,
    RiListUnordered,
    RiParagraph,
    RiSeparator,
    RiStrikethrough,
    RiTextWrap,
} from "src/Assets/RemixIcon";

const Toolbar = ({ editor }) => {
    const setImage = useCallback(() => {
        const url = window.prompt("URL");

        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    }, [editor]);

    if (!editor) {
        return null;
    }

    return (
        <div className="flex h-min w-full flex-row flex-wrap items-center justify-center p-[0.5rem]">
            <button
                className="icon-tiptap"
                onClick={() => editor.chain().focus().toggleBold().run()}
            >
                <RiBold className="align-middle" title="Bold" titleId="Bold" />
            </button>
            <button
                className="icon-tiptap"
                onClick={() => editor.chain().focus().toggleItalic().run()}
            >
                <RiItalic
                    className="align-middle"
                    title="Italic"
                    titleId="Italic"
                />
            </button>
            <button
                className="icon-tiptap"
                onClick={() => editor.chain().focus().toggleStrike().run()}
            >
                <RiStrikethrough
                    className="align-middle"
                    title="Strikethrough"
                    titleId="Strikethrough"
                />
            </button>
            <button
                className="icon-tiptap"
                onClick={() => editor.chain().focus().toggleCode().run()}
            >
                <RiCodeSSlashLine
                    className="align-middle"
                    title="Code Slash"
                    titleId="Code Slash"
                />
            </button>
            <button
                className="icon-tiptap"
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
            >
                <RiH1
                    className="align-middle"
                    title="Heading 1"
                    titleId="Heading 1"
                />
            </button>
            <button
                className="icon-tiptap"
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
            >
                <RiH2
                    className="align-middle"
                    title="Heading 2"
                    titleId="Heading 2"
                />
            </button>
            <button
                className="icon-tiptap"
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
            >
                <RiH3
                    className="align-middle"
                    title="Heading 3"
                    titleId="Heading 3"
                />
            </button>
            <button
                className="icon-tiptap"
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 4 }).run()
                }
            >
                <RiH4
                    className="align-middle"
                    title="Heading 4"
                    titleId="Heading 4"
                />
            </button>
            <button
                className="icon-tiptap"
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 5 }).run()
                }
            >
                <RiH5
                    className="align-middle"
                    title="Heading 5"
                    titleId="Heading 5"
                />
            </button>
            <button
                className="icon-tiptap"
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 6 }).run()
                }
            >
                <RiH6
                    className="align-middle"
                    title="Heading 6"
                    titleId="Heading 6"
                />
            </button>
            <button
                className="icon-tiptap"
                onClick={() => editor.chain().focus().setParagraph().run()}
            >
                <RiParagraph
                    className="align-middle"
                    title="Paragraph"
                    titleId="Paragraph"
                />
            </button>
            <button
                className="icon-tiptap"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
                <RiListOrdered
                    className="align-middle"
                    title="List Order"
                    titleId="List Order"
                />
            </button>
            <button
                className="icon-tiptap"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
                <RiListUnordered
                    className="align-middle"
                    title="List Unorder"
                    titleId="List Unorder"
                />
            </button>
            <button
                className="icon-tiptap"
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            >
                <RiCodeBoxLine
                    className="align-middle"
                    title="Code Box"
                    titleId="Code Box"
                />
            </button>
            <button className="icon-tiptap" onClick={() => setLink(editor)}>
                <RiLink className="align-middle" title="Link" titleId="Link" />
            </button>
            <button className="icon-tiptap" onClick={() => setLink(editor)}>
                <RiLinkUnlink
                    className="align-middle"
                    title="Unlink"
                    titleId="Unlink"
                />
            </button>
            <button
                className="icon-tiptap"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
            >
                <RiDoubleQuotesLt
                    className="align-middle"
                    title="Double Quotes"
                    titleId="Double Quotes"
                />
            </button>
            <button
                className="icon-tiptap"
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
            >
                <RiSeparator
                    className="align-middle"
                    title="Separator"
                    titleId="Separator"
                />
            </button>
            <button
                className="icon-tiptap"
                onClick={() => editor.chain().focus().setHardBreak().run()}
            >
                <RiTextWrap
                    className="align-middle"
                    title="Text Wrap"
                    titleId="Text Wrap"
                />
            </button>
            <button
                className="icon-tiptap"
                onClick={() =>
                    editor.chain().focus().unsetAllMarks().clearNodes().run()
                }
            >
                <RiFormatClear
                    className="align-middle"
                    title="Format Clear"
                    titleId="Format Clear"
                />
            </button>
            <div className="divider"></div>
            <button
                className="icon-tiptap"
                onClick={() => editor.chain().focus().undo().run()}
            >
                <RiArrowGoBackLine
                    className="align-middle"
                    title="Go Back"
                    titleId="Go Back"
                />
            </button>
            <button
                className="icon-tiptap"
                onClick={() => editor.chain().focus().redo().run()}
            >
                <RiArrowGoForwardLine
                    className="align-middle"
                    title="Go Forward"
                    titleId="Go Forward"
                />
            </button>

            <button className="icon-tiptap" onClick={setImage}>
                <RiImageLine
                    className="align-middle"
                    title="Add Image"
                    titleId="Add Image"
                />
            </button>
        </div>
    );
};

export default Toolbar;
