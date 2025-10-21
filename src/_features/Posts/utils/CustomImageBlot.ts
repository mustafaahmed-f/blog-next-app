import Quill from "quill";

//// Step 1️⃣: Import the original Image blot class
const ImageBlot = Quill.import("formats/image") as any;

//// Step 2️⃣: Extend it to create our own version
class CustomImageBlot extends ImageBlot {
  //// Called when a new image blot is inserted
  static create(value: {
    src?: string;
    secure_url?: string;
    public_id: string;
  }) {
    //// we used here the src or secure_url as while editing post, quill gets the delta format and gets the src attr from it
    //// and then pass it to create();
    const src = value.secure_url || value.src || "";
    //// Call parent create() — it returns an <img> DOM node
    const node = super.create(value.secure_url) as HTMLImageElement;

    node.setAttribute("src", src);

    node.setAttribute("data-public-id", value.public_id);
    node.setAttribute("alt", value.public_id);

    //// Return the customized DOM node
    return node;
  }

  //// Called when Quill needs to read the value of this blot (e.g. when saving)
  static value(node: HTMLImageElement) {
    return {
      src: node.getAttribute("src"),
      public_id:
        node.getAttribute("data-public-id") || node.getAttribute("alt"),
    };
  }
}

//// Step 3️⃣: Register it so Quill uses our version instead of the default
Quill.register({ "formats/image": CustomImageBlot });
