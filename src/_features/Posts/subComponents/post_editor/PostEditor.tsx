"use client";

import ErrorToast from "@/_components/Toasts/ErrorToast";
import { useCategoires } from "@/_context/CategoriesContext";
import { InferFormValues } from "@/_utils/helperMethods/InferFormValues";
import {
  showErrorToast,
  showSuccessToast,
} from "@/_utils/helperMethods/showToasts";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { sendPost } from "../../services/sendPost";
import { addPostDefaultValues } from "../../utils/addPostDefaultValues";
import { addPostYupValidation } from "../../utils/addPostYupValidation";
import PostEditorUI from "./PostEditorUI";

interface PostEditorProps {}

function PostEditor({}: PostEditorProps) {
  const router = useRouter();
  const { fetchedCategories, catchedError } = useCategoires();

  const [title, setTitle] = useState<string>("");
  const [selectedCat, setSelectedCat] = useState<string>(
    fetchedCategories[0]?.id ?? "",
  );

  const [quillInstance, setQuillInstance] = useState<Quill | null>(null);

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
        methods.setValue("desc", quillInstance.getText());
        methods.setValue("html", quillInstance.getSemanticHTML());
        methods.setValue("delta", JSON.stringify(quillInstance.getContents()));
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

  async function publishPost(
    data: InferFormValues<typeof addPostYupValidation>,
  ) {
    const formData = new FormData();
    formData.set("title", data.title);
    formData.set("categoryId", data.categoryId);
    formData.set("desc", data.desc);
    formData.set("html", data.html);
    formData.set("delta", data.delta);
    formData.set("img", data.img);
    formData.set("tags", data.tags);

    try {
      const response = await sendPost(formData);
      if (response.data) {
        showSuccessToast("Post published successfully");
        router.push(`/posts/${response.data.slug}`);
      }
    } catch (error: any) {
      console.log("Error : ", error);
      if (error.properties) {
        for (const property in error.properties) {
          showErrorToast((property as any).errors[0]);
        }
        return;
      }
      showErrorToast(error.message);
    }
  }

  function onReady(q: Quill) {
    setQuillInstance(q);
  }

  return (
    <>
      {catchedError && <ErrorToast error={catchedError} />}
      <form onSubmit={methods.handleSubmit(publishPost)}>
        <PostEditorUI
          methods={methods}
          categories={fetchedCategories}
          onReady={onReady}
          disabled={!methods.formState.isValid}
        />
      </form>
    </>
  );
}

export default PostEditor;
