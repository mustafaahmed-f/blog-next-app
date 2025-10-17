import * as yup from "yup";

export const addPostYupValidation = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title must be at most 100 characters"),

  desc: yup
    .string()
    .required("Description is required")
    .max(10000, "Description must be at most 10000 characters"),

  img: yup
    .mixed<File | string>()
    .required("Image is required")
    .test("fileOrUrl", "Invalid image", (value) => {
      if (!value) return true; // ✅ allow missing value

      if (typeof value === "string") {
        try {
          new URL(value);
          return true;
        } catch {
          return false;
        }
      }

      if (value instanceof File) {
        const isImage = value.type.startsWith("image/");
        const isValidSize = value.size <= 1024 * 1024;
        return isImage && isValidSize;
      }

      return false;
    }),

  tags: yup
    .string()
    .required("Tags are required")
    .max(100, "Tags must be at most 100 characters")
    .matches(
      /^[a-zA-Z][a-zA-Z\s-]*(?:,[a-zA-Z][a-zA-Z\s-]*)*$/,
      "Tags must be words separated by commas",
    ),

  html: yup.string().required("HTML is required"),

  delta: yup.string().required("Delta is required"),

  categoryId: yup.string().required("Category ID is required"),
});
