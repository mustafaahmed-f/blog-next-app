import Quill from "quill";
import { useEffect, useRef, useState } from "react";
import { FieldValues, Path, UseFormWatch } from "react-hook-form";
import { QuillImageHandler } from "../../utils/QuillImageHandler";
import { quillOptions } from "../../utils/quillOptions";
import Spinner from "@/_components/Spinner/Spinner";

interface QuillEditorProps<T extends FieldValues> {
  defaultValue?: any;
  onReady: (q: Quill) => void;
  watch: UseFormWatch<T>;
  editMode?: boolean;
  draftId: string;
  isUploading: boolean;
  setIsUploading: React.Dispatch<React.SetStateAction<boolean>>;
}

function QuillEditor<T extends FieldValues>({
  defaultValue,
  onReady,
  watch,
  editMode,
  draftId,
  isUploading,
  setIsUploading,
}: QuillEditorProps<T>) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const defaultValueRef = useRef<any>(defaultValue);

  useEffect(() => {
    const container = containerRef.current;
    const editorContainer = container!.appendChild(
      container!.ownerDocument.createElement("div"),
    );
    const quill = new Quill(editorContainer, quillOptions);
    const toolbar: any = quill.getModule("toolbar");

    toolbar.addHandler("image", () =>
      QuillImageHandler(quill, draftId, setIsUploading),
    );

    if (editMode) {
      const deltaValue = watch("delta" as Path<T>);
      try {
        const parsedDelta =
          typeof deltaValue === "string" ? JSON.parse(deltaValue) : deltaValue;
        quill.setContents(parsedDelta);
      } catch (e) {
        console.error("Invalid delta:", deltaValue, e);
      }
    }

    if (typeof onReady === "function") {
      onReady(quill);
    }

    if (defaultValueRef.current) {
      quill.setContents(defaultValueRef.current);
    }

    return () => {
      container!.innerHTML = "";
    };
  }, []);

  return (
    <div className="relative bg-white" ref={containerRef}>
      {isUploading && (
        <div className="absolute inset-0 z-50 flex cursor-not-allowed items-center justify-center bg-white/60 backdrop-blur-sm">
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default QuillEditor;
