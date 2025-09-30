import { useState } from "react";
import {
  FieldValues,
  Path,
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
}

function ImageUploader<T extends FieldValues>({
  name,
  label,
  required,
  errors,
  watch,
  setValue,
  trigger,
}: ImageUploaderProps<T>) {
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  }

  return (
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
  );
}

export default ImageUploader;
