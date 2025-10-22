"use client";
import Spinner from "@/_components/Spinner/Spinner";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/_components/ui/dropdown-menu";
import { queryClient } from "@/_services/TanstackQuery_Client";
import {
  showErrorToast,
  showSuccessToast,
} from "@/_utils/helperMethods/showToasts";
import { ClerkLoaded, ClerkLoading, SignedIn, useAuth } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import { Check, EllipsisVertical, XIcon } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { deleteComment } from "../../services/deleteComment";
import { updateComment } from "../../services/updateComment";
import styles from "./comments.module.css";

import { RevalidateTagMethod } from "@/_services/RevalidateTagMethod";
import { mainModules } from "@/_utils/constants/mainModules";

interface SingleCommentProps {
  item: any;
}

function SingleComment({ item }: SingleCommentProps) {
  const { getToken, userId } = useAuth();
  const inputSection = useRef<HTMLDivElement | null>(null);
  const dropDownContent = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const { 0: commentContent, 1: setCommentContent } = useState<string>(
    item.desc ?? "",
  );
  const { 0: isEditMode, 1: setIsEditMode } = useState<boolean>(false);
  const { slug } = useParams();
  const [alertOpen, setAlertOpen] = useState(false);
  const [dropListOpen, setDropListOpen] = useState(false);

  const isCommentAuthor: boolean = item.user.clerkId === userId;

  const { mutate: updateMutate, isPending: updatePending } = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return updateComment(
        item.id,
        slug as string,
        { desc: commentContent },
        token ?? "",
      );
    },
    onSuccess: (data) => {
      showSuccessToast(
        data?.message ?? "Comment has been updated successfully !!",
      );
      RevalidateTagMethod(mainModules.comment, "allRecords", slug as string);
      queryClient.invalidateQueries({ queryKey: [slug, "Comments"] });
      setIsEditMode(false);
    },
    onError: (error) => {
      showErrorToast(error.message);
    },
  });

  const { mutate: deleteMutate, isPending: deletePending } = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return deleteComment(item.id, slug as string, token ?? "");
    },
    onSuccess: (data) => {
      showSuccessToast(
        data?.message ?? "Comment has been deleted successfully !!",
      );
      RevalidateTagMethod(mainModules.comment, "allRecords", slug as string);
      queryClient.invalidateQueries({ queryKey: [slug, "Comments"] });
      setIsEditMode(false);
    },
    onError: (error) => {
      showErrorToast(error.message);
      setCommentContent(item.desc);
    },
  });

  function handleUpdateComment() {
    if (item.desc === commentContent) return;
    if (!isEditMode || (isEditMode && !commentContent)) return;

    updateMutate();
  }

  function handleDeleteComment() {
    deleteMutate();
  }

  const isPending = updatePending || deletePending;

  useEffect(() => {
    function closeEditBox(e: MouseEvent) {
      const target = e.target;
      if (
        isEditMode &&
        !inputSection.current?.contains(target as Node) &&
        !dropDownContent.current?.contains(target as Node)
      ) {
        console.log("Clicked");
        setIsEditMode(false);
        setCommentContent(item.desc);
      }
    }

    document.addEventListener("click", closeEditBox);
    return () => {
      document.removeEventListener("click", closeEditBox);
    };
  }, [isEditMode, item.desc, setCommentContent, setIsEditMode]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [commentContent]);

  return (
    <div
      className={`${styles.comment} ${isPending && "pointer-events-none opacity-60"}`}
    >
      <div className="flex flex-nowrap items-center justify-between">
        <div className={styles.user}>
          {item?.user?.img ? (
            <Image
              src={item.user.img}
              alt=""
              width={50}
              height={50}
              className={styles.image}
            />
          ) : (
            <Image
              src={"/icons8-avatar-50.png"}
              alt="User avatar"
              width={50}
              height={50}
              className={styles.image}
            />
          )}
          <div className={styles.userInfo}>
            <span className={styles.username}>{item.user.userName}</span>
            <span className={styles.date}>{item.createdAt.slice(0, 10)}</span>
          </div>
        </div>
        <ClerkLoading>
          <Spinner />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            {isCommentAuthor && (
              <div>
                <DropdownMenu
                  open={dropListOpen}
                  onOpenChange={setDropListOpen}
                >
                  <DropdownMenuTrigger asChild className="min-w-fit p-0">
                    <Button
                      variant="link"
                      className="min-w-fit cursor-pointer bg-transparent px-0 py-0"
                    >
                      <EllipsisVertical size={10} className="px-0 py-0" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-fit min-w-fit"
                    ref={dropDownContent}
                  >
                    <DropdownMenuItem
                      className="mx-auto w-fit cursor-pointer px-3 py-1"
                      onClick={() => setIsEditMode(true)}
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="mx-auto w-fit cursor-pointer px-3 py-1 text-red-500 hover:text-red-700"
                      onClick={(e: any) => e.preventDefault()}
                    >
                      <AlertDialog
                        open={alertOpen}
                        onOpenChange={setAlertOpen}
                        // key={item.id}
                      >
                        <AlertDialogTrigger asChild>
                          <span
                            onClick={() => {
                              setAlertOpen(true);
                            }}
                          >
                            Delete
                          </span>
                        </AlertDialogTrigger>
                        <AlertDialogContent style={{ padding: "20px" }}>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this comment ?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <Button
                              variant="outline"
                              onClick={() => {
                                setAlertOpen(false);
                              }}
                              className="cursor-pointer p-2"
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={handleDeleteComment}
                              className="cursor-pointer p-2 text-white"
                            >
                              Confirm
                            </Button>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </SignedIn>
        </ClerkLoaded>
      </div>
      <div
        className="flex flex-nowrap items-center gap-2 sm:gap-3"
        ref={inputSection}
      >
        <textarea
          name="comment_content"
          className={`${styles.desc} w-full grow resize-none px-2 py-1 leading-relaxed break-words whitespace-pre-wrap ${isEditMode ? "cursor-text ring-1" : "cursor-default"} outline-0`}
          value={commentContent}
          ref={inputRef}
          onChange={(e) => {
            setCommentContent(e.target.value);
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight + "px";
          }}
          readOnly={!isEditMode}
        />
        {isEditMode && (
          <div className="flex flex-col items-center gap-1">
            <span
              className="cursor-pointer hover:text-blue-400"
              onClick={handleUpdateComment}
            >
              <Check size={14} />
            </span>
            <span
              className="cursor-pointer hover:text-red-400"
              onClick={() => setIsEditMode(false)}
            >
              <XIcon size={14} />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default SingleComment;
