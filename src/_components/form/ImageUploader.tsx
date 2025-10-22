import { getErrObject } from "@/_utils/helperMethods/getErrObject";
import { useEffect, useState } from "react";
import {
  FieldValues,
  Path,
  PathValue,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";
import styles from "./ImageUploader.module.css";

interface ImageUploaderProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  required?: boolean;
  errors: any;
  watch: UseFormWatch<T>;
  setValue: UseFormSetValue<T>;
  trigger: UseFormTrigger<T>;
  editMode?: boolean;
}

function ImageUploader<T extends FieldValues>({
  name,
  label,
  required,
  errors,
  watch,
  setValue,
  trigger,
  editMode,
}: ImageUploaderProps<T>) {
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const errorObj = getErrObject<T>(errors, name);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setValue(name, file as PathValue<T, Path<T>>, {
        shouldValidate: true,
        shouldDirty: true,
      });
      trigger(name);
    }
  }

  useEffect(() => {
    if (editMode) {
      setPreviewUrl(watch("img" as Path<T>));
    }
  }, []);

  return (
    <div className={styles.imageUpload}>
      <label style={{ wordBreak: "keep-all", whiteSpace: "nowrap" }}>
        {label}
        {required && <span className="ms-1 text-red-500">*</span>}
        {" : "}
      </label>
      <label htmlFor="postImage" className={styles.uploadBtn}>
        {image || editMode ? "Change Image" : "Choose Image"}
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

      {errorObj && (
        <p className="mt-1 text-xs text-red-600">{errorObj.message}</p>
      )}
    </div>
  );
}

export default ImageUploader;
