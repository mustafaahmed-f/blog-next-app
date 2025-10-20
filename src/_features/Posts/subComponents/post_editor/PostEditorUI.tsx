import DropList from "@/_components/form/DropList";
import ImageUploader from "@/_components/form/ImageUploader";
import { Button } from "@/_components/ui/button";
import { InferFormValues } from "@/_utils/helperMethods/InferFormValues";
import Quill from "quill";
import { UseFormReturn } from "react-hook-form";
import { addPostYupValidation } from "../../utils/addPostYupValidation";
import styles from "./PostEditor.module.css";
import QuillEditor from "./QuillEditor";
import TagsInputField from "./TagsInputField";
import InputField from "@/_components/form/InputField";

type PostFormValues = InferFormValues<typeof addPostYupValidation>;

interface PostEditorUIProps {
  methods: UseFormReturn<PostFormValues>;
  categories: any[];
  onReady: (q: Quill) => void;
  disabled?: boolean;
  editMode?: boolean;
  isPublishingPost?: boolean;
  draftId?: string;
}

function PostEditorUI({
  methods,
  categories,
  onReady,
  disabled,
  editMode,
  draftId,
  isPublishingPost,
}: PostEditorUIProps) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Add new post</h1>
      <div className="rounded-lg bg-amber-100 p-3">
        <p className="text-base text-amber-500">
          <span className="text-lg text-black uppercase">**Hint : </span>
          If post is not published within 2 hours, any images uploaded inside
          post body will be deleted automatically from cloud and so they won't
          appear in the post after publishing.
        </p>
      </div>

      {/*  //// Add Title section */}

      <InputField
        name="title"
        label="Title"
        placeholder="Enter post title"
        required
        errors={methods.formState.errors}
        setValue={methods.setValue}
        trigger={methods.trigger}
        watch={methods.watch}
        register={methods.register}
      />

      {/*  //// Add Category section */}

      <DropList<InferFormValues<typeof addPostYupValidation>>
        options={categories}
        name="categoryId"
        label="Category"
        required
        errors={methods.formState.errors}
        setValue={methods.setValue}
        trigger={methods.trigger}
        watch={methods.watch}
      />

      {/*  //// Add Tags section */}

      <TagsInputField<InferFormValues<typeof addPostYupValidation>>
        name="tags"
        label="Tags"
        required
        watch={methods.watch}
        errors={methods.formState.errors}
        setValue={methods.setValue}
        trigger={methods.trigger}
        editMode={editMode}
      />

      {/* //// Add image section */}

      <ImageUploader<InferFormValues<typeof addPostYupValidation>>
        name="img"
        label="Main Image"
        required
        errors={methods.formState.errors}
        setValue={methods.setValue}
        trigger={methods.trigger}
        watch={methods.watch}
        editMode={editMode}
      />

      <QuillEditor<InferFormValues<typeof addPostYupValidation>>
        defaultValue={""}
        onReady={onReady}
        watch={methods.watch}
        editMode={editMode}
        draftId={draftId}
      />

      <div
        style={{
          marginTop: "20px",
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Button className={styles.publishBtn} disabled={disabled}>
          {editMode
            ? isPublishingPost
              ? "Updating ..."
              : "Update"
            : isPublishingPost
              ? "Publishing ..."
              : "Publish"}
        </Button>
      </div>
    </div>
  );
}

export default PostEditorUI;
