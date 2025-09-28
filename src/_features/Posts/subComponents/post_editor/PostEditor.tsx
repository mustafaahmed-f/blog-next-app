"use client";

import ErrorToast from "@/_components/Toasts/ErrorToast";
import { useCategoires } from "@/_context/CategoriesContext";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useRef, useState } from "react";
import styles from "./PostEditor.module.css";
import QuillEditor from "./QuillEditor";

const Delta = Quill.import("delta");

interface PostEditorProps {}

function PostEditor({}: PostEditorProps) {
  const [title, setTitle] = useState<string>("");
  const [catSlug, setCatSlug] = useState<string>("");
  const { fetchedCategories, catchedError } = useCategoires();

  // const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<any>(null);

  return (
    <>
      {catchedError && <ErrorToast error={catchedError} />}
      <div className={styles.container}>
        <h1 className={styles.title}>Add new post</h1>
        <input
          type="text"
          placeholder="Title"
          className={styles.input}
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <div
          style={{
            width: "100%",
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <label>Category : </label>
          <select
            className={styles.select}
            style={{ flexGrow: 1 }}
            onChange={(e) => setCatSlug(e.target.value)}
            value={catSlug}
          >
            {fetchedCategories.map((item: any) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>
        </div>

        <QuillEditor
          ref={quillRef}
          defaultValue={new Delta()
            .insert("Hello")
            .insert("\n", { header: 1 })
            .insert("Some ")
            .insert("initial", { bold: true })
            .insert(" ")
            .insert("content", { underline: true })
            .insert("\n")}
        />
      </div>
    </>
  );
}

export default PostEditor;
