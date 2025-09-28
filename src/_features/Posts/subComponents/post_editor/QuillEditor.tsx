import Quill from "quill";
import React, { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import { quillOptions } from "../../utils/quillOptions";

interface QuillEditorProps {
  defaultValue?: any;
}

// Editor is an uncontrolled React component
const QuillEditor = forwardRef<any, QuillEditorProps>(
  ({ defaultValue }: QuillEditorProps, ref) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const defaultValueRef = useRef<any>(defaultValue);

    useEffect(() => {
      const container = containerRef.current;
      const editorContainer = container!.appendChild(
        container!.ownerDocument.createElement("div"),
      );
      const quill = new Quill(editorContainer, quillOptions);

      if (
        ref &&
        typeof ref === "object" &&
        ref !== null &&
        "current" in ref &&
        ref.current
      )
        ref.current = quill;

      if (defaultValueRef.current) {
        quill.setContents(defaultValueRef.current);
      }

      return () => {
        if (
          ref &&
          typeof ref === "object" &&
          ref !== null &&
          "current" in ref &&
          ref.current
        ) {
          ref.current = null;
        }
        container!.innerHTML = "";
      };
    }, [ref]);

    return <div ref={containerRef}></div>;
  },
);

QuillEditor.displayName = "QuillEditor";

export default QuillEditor;
