export const quillOptions = {
  theme: "snow",
  modules: {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      ["link", "image", "video", "code-block"],
      ["clean"], // remove formatting button

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      [{ size: ["small", false, "large", "huge"] }],
    ],
  },
  placeholder: "Write your post content here...",
};
