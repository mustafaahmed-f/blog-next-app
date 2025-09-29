import Quill from "quill";
import React, { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import { quillOptions } from "../../utils/quillOptions";

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
