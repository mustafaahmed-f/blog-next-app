"use client";

import ErrorToast from "@/_components/Toasts/ErrorToast";
import { useCategoires } from "@/_context/CategoriesContext";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useEffect, useRef, useState } from "react";
import styles from "./PostEditor.module.css";
import QuillEditor from "./QuillEditor";
import { Button } from "@/_components/ui/button";
import DropList from "@/_components/form/DropList";
import { useForm } from "react-hook-form";
import { InferFormValues } from "@/_utils/helperMethods/InferFormValues";
import { addPostYupValidation } from "../../utils/addPostYupValidation";
import { addPostDefaultValues } from "../../utils/addPostDefaultValues";
import { yupResolver } from "@hookform/resolvers/yup";
import TagsInputField from "./TagsInputField";
import ImageUploader from "@/_components/form/ImageUploader";
import PostEditorUI from "./PostEditorUI";

interface PostEditorProps {}

function PostEditor({}: PostEditorProps) {
  const { fetchedCategories, catchedError } = useCategoires();

  const [title, setTitle] = useState<string>("");
  const [selectedCat, setSelectedCat] = useState<string>(
    fetchedCategories[0]?.id ?? "",
  );

  const [quillInstance, setQuillInstance] = useState<Quill | null>(null);

  const canSend: boolean =
    title !== "" &&
    selectedCat !== "" &&
    quillInstance !== null &&
    quillInstance.getLength() > 10;

  const methods = useForm<InferFormValues<typeof addPostYupValidation>>({
    defaultValues: addPostDefaultValues,
    resolver: yupResolver(addPostYupValidation),
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "firstError",
  });

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
      // tags: tags.join(","),
      html: quillInstance?.getSemanticHTML(),
      delta: JSON.stringify(quillInstance?.getContents()),
    };

    console.log("Values : ", methods.getValues());
  }

  function onReady(q: Quill) {
    setQuillInstance(q);
  }

  return (
    <>
      {catchedError && <ErrorToast error={catchedError} />}
      <PostEditorUI
        methods={methods}
        categories={fetchedCategories}
        onReady={onReady}
        publishPost={publishPost}
      />
    </>
  );
}

export default PostEditor;
