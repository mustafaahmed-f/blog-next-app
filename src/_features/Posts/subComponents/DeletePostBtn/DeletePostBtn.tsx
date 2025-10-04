"use client";

import { Button } from "@/_components/ui/button";
import styles from "./DeletePostBtn.module.css";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/_components/ui/alert-dialog";
import {
  showErrorToast,
  showSuccessToast,
} from "@/_utils/helperMethods/showToasts";
import { deletePost } from "../../services/deletePost";
import { useRouter } from "next/navigation";

interface DeletePostBtnProps {
  postSlug: string;
}

function DeletePostBtn({ postSlug }: DeletePostBtnProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  async function handleDelete() {
    try {
      const response = await deletePost(postSlug);
      if (response.data) {
        showSuccessToast("Post has been deleted successfully");
        setOpen(false);
        router.push("/");
      }
    } catch (error: any) {
      console.log(error);
      showErrorToast(error.message);
    }
  }
  return (
    <AlertDialog open={open} onOpenChange={setOpen} key={postSlug}>
      <AlertDialogTrigger asChild>
        <Button className={styles.button} onClick={() => setOpen(true)}>
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent style={{ padding: "20px" }}>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this record?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setOpen(false);
            }}
            className="cursor-pointer p-2"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            className="cursor-pointer p-2 text-white"
          >
            Confirm
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeletePostBtn;
