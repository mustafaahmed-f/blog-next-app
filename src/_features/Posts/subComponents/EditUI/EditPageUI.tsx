"use client";

import { Button } from "@/_components/ui/button";
import { useParams, useRouter } from "next/navigation";
import PostEditor from "../post_editor/PostEditor";

interface EditPageUIProps {
  post: any;
}

function EditPageUI({ post }: EditPageUIProps) {
  const router = useRouter();
  const { slug } = useParams();
  return (
    <>
      <Button
        onClick={() => router.push(`/posts/${slug}`)}
        variant={"link"}
        style={{ cursor: "pointer", marginBottom: "20px" }}
      >
        <span style={{ marginRight: "2px" }}>←</span> Back to Post
      </Button>
      <PostEditor editMode editModeDefaultValues={post} />
    </>
  );
}

export default EditPageUI;
