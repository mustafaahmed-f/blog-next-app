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
  publishPost: () => void;
}

function PostEditorUI({
  methods,
  categories,
  onReady,
  publishPost,
}: PostEditorUIProps) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Add new post</h1>

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
      />

      {/* //// Add image section */}

      <ImageUploader<InferFormValues<typeof addPostYupValidation>>
        name="img"
        required
        label="Main Image"
        errors={methods.formState.errors}
        setValue={methods.setValue}
        trigger={methods.trigger}
        watch={methods.watch}
      />

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
  );
}

export default PostEditorUI;
