export const quillOptions = {
  theme: "snow",
  modules: {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ font: [] }],

      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      ["link", "image", "video", "code-block"],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme

      [{ align: [] }],

      ["clean"], // remove formatting button
    ],
  },
  placeholder: "Write your post content here...",
};
