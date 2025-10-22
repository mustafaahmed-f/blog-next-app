"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/_components/ui/alert-dialog";
import { Button } from "@/_components/ui/button";
import {
  showErrorToast,
  showSuccessToast,
} from "@/_utils/helperMethods/showToasts";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deletePost } from "../../services/deletePost";
import styles from "./DeletePostBtn.module.css";

import { RevalidateTagMethod } from "@/_services/RevalidateTagMethod";
import { mainModules } from "@/_utils/constants/mainModules";

interface DeletePostBtnProps {
  postSlug: string;
}

function DeletePostBtn({ postSlug }: DeletePostBtnProps) {
  const { getToken } = useAuth();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  async function handleDelete() {
    try {
      const token = await getToken();
      const response = await deletePost(postSlug, token ?? "");
      if (response.data) {
        showSuccessToast("Post has been deleted successfully");
        RevalidateTagMethod(mainModules.post, "allRecords", postSlug);
        setOpen(false);
        router.push("/");
      }
    } catch (error: any) {
      console.log(error);
      setOpen(false);
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
