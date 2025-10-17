import Quill from "quill";
import { useEffect, useRef } from "react";
import { FieldValues, Path, UseFormWatch } from "react-hook-form";
import { QuillImageHandler } from "../../utils/QuillImageHandler";
import { quillOptions } from "../../utils/quillOptions";

interface QuillEditorProps<T extends FieldValues> {
  defaultValue?: any;
  onReady: (q: Quill) => void;
  watch: UseFormWatch<T>;
  editMode?: boolean;
}

function QuillEditor<T extends FieldValues>({
  defaultValue,
  onReady,
  watch,
  editMode,
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
    toolbar.addHandler("image", () => QuillImageHandler(quill));

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

  return <div ref={containerRef}></div>;
}

export default QuillEditor;
