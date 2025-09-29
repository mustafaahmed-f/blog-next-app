"use client";

import ErrorToast from "@/_components/Toasts/ErrorToast";
import { useCategoires } from "@/_context/CategoriesContext";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useEffect, useRef, useState } from "react";
import styles from "./PostEditor.module.css";
import QuillEditor from "./QuillEditor";

const Delta = Quill.import("delta");

interface PostEditorProps {}

function PostEditor({}: PostEditorProps) {
  const [title, setTitle] = useState<string>("");
  const [catSlug, setCatSlug] = useState<string>("");
  const [quillInstance, setQuillInstance] = useState<Quill | null>(null);
  const { fetchedCategories, catchedError } = useCategoires();

  function onReady(q: Quill) {
    setQuillInstance(q);
  }

  console.log("quillInstance", quillInstance);

  useEffect(() => {
    function handler() {
      if (quillInstance) {
        console.log("Get contents : ", quillInstance?.getContents());
      }
    }

    if (quillInstance) {
      quillInstance.on(Quill.events.TEXT_CHANGE, handler);
    }

    return () => {
      if (quillInstance) {
        quillInstance.off(Quill.events.TEXT_CHANGE, handler);
      }
    };
  }, [quillInstance]);

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
          defaultValue={new Delta()
            .insert("Hello")
            .insert("\n", { header: 1 })
            .insert("Some ")
            .insert("initial", { bold: true })
            .insert(" ")
            .insert("content", { underline: true })
            .insert("\n")}
          onReady={onReady}
        />
      </div>
    </>
  );
}

export default PostEditor;
