import { showErrorToast } from "@/_utils/helperMethods/showToasts";
import Quill from "quill";
import { sendPostImg } from "../services/sendPostImg";

export function QuillImageHandler(quill: Quill, draftId?: string) {
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
      const response = await sendPostImg(formData, draftId);
      if (response.error) {
        showErrorToast(response.error);
        console.log("Error : ", response.error);
        return;
      }

      const imgObj = response.data;
      const imageURL = imgObj.secure_url;
      const public_id = imgObj.public_id;

      const range = quill.getSelection();
      quill.insertEmbed(range?.index ?? 1, "image", imageURL);
    } catch (error: any) {
      showErrorToast(error.message);
      console.log(error);
    }
  };
}
