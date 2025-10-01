import Quill from "quill";
import React, { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import { quillOptions } from "../../utils/quillOptions";
import { QuillImageHandler } from "../../utils/QuillImageHandler";

interface QuillEditorProps {
  defaultValue?: any;
  onReady: (q: Quill) => void;
}

function QuillEditor({ defaultValue, onReady }: QuillEditorProps) {
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
