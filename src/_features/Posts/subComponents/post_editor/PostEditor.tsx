"use client";

import ErrorToast from "@/_components/Toasts/ErrorToast";
import { useCategoires } from "@/_context/CategoriesContext";
import { InferFormValues } from "@/_utils/helperMethods/InferFormValues";
import {
  showErrorToast,
  showSuccessToast,
} from "@/_utils/helperMethods/showToasts";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useRouter } from "next/navigation";
import Quill, { Delta, EmitterSource } from "quill";
import "quill/dist/quill.snow.css";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { sendPost } from "../../services/sendPost";
import { addPostDefaultValues } from "../../utils/addPostDefaultValues";
import { addPostYupValidation } from "../../utils/addPostYupValidation";
import PostEditorUI from "./PostEditorUI";
import { editPost } from "../../services/editPost";
import { useAuth } from "@clerk/nextjs";

import "../../utils/CustomImageBlot";

interface PostEditorProps {
  draftId?: string;
  editMode?: boolean;
  editModeDefaultValues?: InferFormValues<typeof addPostYupValidation>;
}

function PostEditor({
  draftId,
  editMode = false,
  editModeDefaultValues,
}: PostEditorProps) {
  const router = useRouter();
  const { slug } = useParams();
  const { getToken } = useAuth();
  const { fetchedCategories, catchedError } = useCategoires();
  const { 0: isPublishingPost, 1: setIsPublishingPost } =
    useState<boolean>(false);

  const [quillInstance, setQuillInstance] = useState<Quill | null>(null);

  const methods = useForm<InferFormValues<typeof addPostYupValidation>>({
    defaultValues: editMode ? editModeDefaultValues : addPostDefaultValues,
    resolver: yupResolver(addPostYupValidation),
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "firstError",
  });

  console.log("Values : ", methods.getValues());
  useEffect(() => {
    if (editMode && editModeDefaultValues) {
      methods.reset(editModeDefaultValues);
    }
  }, [editMode, editModeDefaultValues, methods]);

  useEffect(() => {
    function handler(delta: Delta, oldDelta: Delta, source: EmitterSource) {
      if (quillInstance) {
        localStorage.setItem(
          "blog_app_post_content",
          JSON.stringify(quillInstance.getContents()),
        );
        methods.setValue("desc", quillInstance.getText(), {
          shouldDirty: true,
        });
        methods.setValue("html", quillInstance.getSemanticHTML(), {
          shouldDirty: true,
        });
        methods.setValue("delta", JSON.stringify(quillInstance.getContents()), {
          shouldDirty: true,
        });
        methods.trigger();
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
    if (editMode && Object.keys(methods.formState.dirtyFields).length === 0)
      return;
    setIsPublishingPost(true);
    const formData = new FormData();
    formData.set("title", data.title);
    formData.set("categoryId", data.categoryId);
    formData.set("desc", data.desc);
    formData.set("html", data.html);
    formData.set("delta", data.delta);

    if (data.img instanceof File) formData.set("img", data.img);

    if (!editMode && draftId) formData.set("draftId", draftId);
    if (editMode && editModeDefaultValues)
      formData.set("draftId", (editModeDefaultValues as any).draftId);

    formData.set("tags", data.tags);

    if (editMode)
      formData.set(
        "dirtyFields",
        Object.keys(methods.formState.dirtyFields).join(","),
      );

    try {
      const token = await getToken();

      const response = editMode
        ? await editPost(formData, slug as string, token)
        : await sendPost(formData, token);
      if (response.data) {
        showSuccessToast(
          editMode
            ? "Post updated successfully"
            : "Post published successfully",
        );
        setIsPublishingPost(false);
        router.push(`/posts/${response.data.slug}`);
      }
    } catch (error: any) {
      console.log("Error : ", error);
      setIsPublishingPost(false);
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

  /*
  
      function cleanBrokenImagesFromHTML(html: string) {
      const doc = new DOMParser().parseFromString(html, "text/html");
      doc.querySelectorAll("img").forEach((img) => {
        fetch(img.src, { method: "HEAD" })
          .then(res => { if (!res.ok) img.remove(); })
          .catch(() => img.remove());
      });
      return doc.body.innerHTML;
      }

  */

  return (
    <>
      {catchedError && <ErrorToast error={catchedError} />}
      <form
        onSubmit={methods.handleSubmit(publishPost)}
        className={`${isPublishingPost && "pointer-events-none opacity-65"}`}
      >
        <PostEditorUI
          methods={methods}
          categories={fetchedCategories}
          onReady={onReady}
          disabled={
            editMode && !methods.formState.isDirty
              ? true
              : !methods.formState.isValid
          }
          editMode={editMode}
          isPublishingPost={isPublishingPost}
          draftId={editMode ? (editModeDefaultValues as any).draftId : draftId}
        />
      </form>
    </>
  );
}

export default PostEditor;
