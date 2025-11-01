import { showErrorToast } from "@/_utils/helperMethods/showToasts";
import Quill from "quill";
import { sendPostImg } from "../services/sendPostImg";

export function QuillImageHandler(
  quill: Quill,
  draftId: string,
  setIsUploading: React.Dispatch<React.SetStateAction<boolean>>,
  token?: string,
) {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");

  input.click();

  input.onchange = async () => {
    const image = input.files?.[0];
    if (!image) return;

    const formData: FormData = new FormData();
    formData.set("img", image);

    try {
      setIsUploading(true);
      const response = await sendPostImg(formData, draftId, token);
      if (response.error) {
        showErrorToast(response.error);
        console.log("Error : ", response.error);
        return;
      }

      const imgObj = response.data;

      const range = quill.getSelection();
      quill.insertEmbed(range?.index ?? 1, "image", imgObj);
    } catch (error: any) {
      showErrorToast(error.message);
      console.log(error);
    } finally {
      setIsUploading(false);
    }
  };
}
