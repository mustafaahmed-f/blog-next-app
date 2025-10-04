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
import styles from "./PostEditor.module.css";

interface TagsInputFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  required?: boolean;
  errors: any;
  watch: UseFormWatch<T>;
  setValue: UseFormSetValue<T>;
  trigger: UseFormTrigger<T>;
  editMode?: boolean;
}

function TagsInputField<T extends FieldValues>({
  name,
  label,
  required,
  errors,
  watch,
  setValue,
  trigger,
  editMode,
}: TagsInputFieldProps<T>) {
  const errorObj = getErrObject<T>(errors, name);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");

  function updateFromValue() {
    setValue(name, tags.join(",") as PathValue<T, Path<T>>, {
      shouldValidate: true,
      shouldDirty: true,
    });
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

  useEffect(() => {
    if (editMode) {
      setTags(watch(name).split(","));
    }
  }, []);

  useEffect(() => {
    updateFromValue();
  }, [tags]);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <label style={{ wordBreak: "keep-all", whiteSpace: "nowrap" }}>
        {label}
        {required && <span className="ms-1 text-red-500">*</span>}
        {" : "}
      </label>
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
      {errorObj && (
        <p className="mt-1 text-xs text-red-600">{errorObj.message}</p>
      )}
    </div>
  );
}

export default TagsInputField;
