import { BaseEditor, Editor, Node, Text, Transforms } from "slate";
import { ReactEditor } from "slate-react";

export type CustomEditorType = BaseEditor & ReactEditor;

export const CustomEditor = {
    isBoldMarkActive(editor: CustomEditorType) {
        const [match] = Editor.nodes(editor, {
            match: (n) => Text.isText(n) && n.bold === true,
            universal: true
        });

        return !!match;
    },

    isCodeMarkActive(editor: CustomEditorType) {
        const [match] = Editor.nodes<Node>(editor, {
            match: n => Text.isText(n) && n.code === true
        });

        return !!match;
    },

    isItalicMarkActive(editor: CustomEditorType) {
        const [match] = Editor.nodes<Node>(editor, {
            match: n => Text.isText(n) && n.italic === true
        });

        return !!match;
    },

    isStrikethroughMarkActive(editor: CustomEditorType) {
        const [match] = Editor.nodes<Node>(editor, {
            match: n => Text.isText(n) && n.strikeThrough === true
        });

        return !!match;
    },

    toggleBoldMark(editor: CustomEditorType) {
        const isActive = CustomEditor.isBoldMarkActive(editor);

        Transforms.setNodes(
            editor,
            { bold: isActive ? undefined : true },
            { match: n => Text.isText(n), split: true }
        );
    },

    toggleCodeMark(editor: CustomEditorType) {
        const isActive = CustomEditor.isCodeMarkActive(editor);
        Transforms.setNodes(
            editor,
            { code: isActive ? undefined : true },
            { match: n => Text.isText(n), split: true }
        )
    },

    toggleItalicMark(editor: CustomEditorType) {
        const isActive = CustomEditor.isItalicMarkActive(editor);
        Transforms.setNodes(
            editor,
            { italic: isActive ? undefined : true },
            { match: n => Text.isText(n), split: true }
        )
    },

    toggleStrikethroughMark(editor: CustomEditorType) {
        const isActive = CustomEditor.isStrikethroughMarkActive(editor);
        Transforms.setNodes(
            editor,
            { strikeThrough: isActive ? undefined : true },
            { match: n => Text.isText(n), split: true }
        )
    },
}
