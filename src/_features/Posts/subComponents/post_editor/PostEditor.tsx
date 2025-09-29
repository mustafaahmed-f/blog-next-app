"use client";

import ErrorToast from "@/_components/Toasts/ErrorToast";
import { useCategoires } from "@/_context/CategoriesContext";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useEffect, useRef, useState } from "react";
import styles from "./PostEditor.module.css";
import QuillEditor from "./QuillEditor";
import { Button } from "@/_components/ui/button";

const Delta = Quill.import("delta");

interface PostEditorProps {}

function PostEditor({}: PostEditorProps) {
  const { fetchedCategories, catchedError } = useCategoires();

  const [title, setTitle] = useState<string>("");
  const [selectedCat, setSelectedCat] = useState<string>(
    fetchedCategories[0]?.id ?? "",
  );

  const [quillInstance, setQuillInstance] = useState<Quill | null>(null);

  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");

  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const canSend: boolean =
    title !== "" &&
    selectedCat !== "" &&
    quillInstance !== null &&
    quillInstance.getLength() > 10;

  useEffect(() => {
    function handler() {
      if (quillInstance) {
        localStorage.setItem(
          "blog_app_post_content",
          JSON.stringify(quillInstance.getContents()),
        );
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

  function publishPost() {
    // if (!canSend) return;
    //todo : after submiting the post, clear the localstorage
    //todo : the final post will be form data as we will send the img file

    const newPost = {
      title,
      desc: quillInstance?.getText(),
      tags: tags.join(","),
      html: quillInstance?.getSemanticHTML(),
      delta: JSON.stringify(quillInstance?.getContents()),
    };

    console.log("New Post : ", newPost);
  }
  function onReady(q: Quill) {
    setQuillInstance(q);
  }

  function addTag(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setTagInput("");
    }
  }

  function removeTag(tag: string) {
    setTags(tags.filter((t) => t !== tag));
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  }

  const fakeImg =
    "https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1694290122808-71AL1tTRosL._SL1500_.jpg";

  return (
    <>
      {catchedError && <ErrorToast error={catchedError} />}
      <div className={styles.container}>
        <h1 className={styles.title}>Add new post</h1>

        {/*  //// Add Title section */}

        <input
          type="text"
          placeholder="Title"
          className={styles.input}
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        {/*  //// Add Category section */}

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
            onChange={(e) => setSelectedCat(e.target.value)}
            value={selectedCat}
          >
            {fetchedCategories.map((item: any) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>
        </div>

        {/*  //// Add Tags section */}

        <div style={{ width: "100%" }}>
          <label>Tags : </label>
          <div className={styles.tagsContainer}>
            {tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className={styles.removeTagBtn}
                >
                  ×
                </button>
              </span>
            ))}
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={addTag}
              placeholder="Type tags ..."
              className={styles.tagInput}
            />
          </div>
          <span style={{ fontSize: "12px", color: "gray" }}>
            Press enter to add tags
          </span>
        </div>

        {/* //// Add image section */}

        <div className={styles.imageUpload}>
          <label>Main Image : </label>
          <label htmlFor="postImage" className={styles.uploadBtn}>
            {image ? "Change Image" : "Choose Image"}
          </label>
          <input
            id="postImage"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className={styles.hiddenInput}
          />

          {previewUrl && (
            <div className={styles.imagePreview}>
              <img src={previewUrl} alt="Preview" />
            </div>
          )}
        </div>

        <QuillEditor defaultValue={""} onReady={onReady} />

        <div
          style={{
            marginTop: "20px",
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button onClick={publishPost} className={styles.publishBtn}>
            Publish
          </Button>
        </div>
      </div>
    </>
  );
}

export default PostEditor;
