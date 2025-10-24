import Spinner from "@/_components/Spinner/Spinner";
import { Button } from "@/_components/ui/button";
import { queryClient } from "@/_services/TanstackQuery_Client";
import { showErrorToast } from "@/_utils/helperMethods/showToasts";
import { SignedIn, useAuth } from "@clerk/nextjs";
import { InfiniteData } from "@tanstack/react-query";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useParams, usePathname, useRouter } from "next/navigation";
import { forwardRef, useRef, useState, useTransition } from "react";
import { addComment } from "../../services/addComment";
import styles from "./comments.module.css";
import SingleComment from "./SingleComment";

import { RevalidateTagMethod } from "@/_services/RevalidateTagMethod";
import { mainModules } from "@/_utils/constants/mainModules";

interface CommentsUIProps {
  data:
    | InfiniteData<
        {
          message: string;
          data: any;
          error: string | null;
          additionalInfo: any;
        },
        unknown
      >
    | undefined;
  allComments: any;
  isError: boolean;
  error: any;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isFetchNextPageError: boolean;
  canFetchMore: boolean;
}

const CommentsUI = forwardRef<HTMLDivElement, CommentsUIProps>(
  (
    {
      data,
      allComments,
      isError,
      error,

      isFetchNextPageError,
      isFetchingNextPage,
      canFetchMore,
      hasNextPage,
    },
    ref,
  ) => {
    const { getToken } = useAuth();
    const { 0: commentContent, 1: setCommentContent } = useState<string>("");
    const { slug } = useParams();
    const router = useRouter();
    const pathName = usePathname();
    const { 0: isPending, 1: startTransition } = useTransition();
    const isCommentsPage = pathName.includes("comments");
    const listElement = useRef<HTMLDivElement | null>(null);

    const rowVirtualizer = useWindowVirtualizer({
      //* we use allcomments.length + 1 when we have next page to count for the loading indicator so it can be rendered
      //* below comments.
      count: hasNextPage ? allComments.length + 1 : allComments.length,
      scrollMargin: listElement.current?.offsetTop ?? 0,
      estimateSize: () => 130,
      measureElement: (el) => el.getBoundingClientRect().height,
      overscan: 4,
    });

    const uniqueComments = Array.from(
      new Map(
        allComments?.map((comment: any) => [comment.id, comment]),
      ).values(),
    );

    async function handleAddComment() {
      if (commentContent) {
        startTransition(async () => {
          try {
            const newComment = {
              desc: commentContent,
            };
            await new Promise((resolve) => setTimeout(resolve, 500));
            const token = await getToken();
            const response = await addComment(
              slug as string,
              newComment,
              token as string,
            );
            if (response.error) {
              showErrorToast(response.error);
              return;
            }
            RevalidateTagMethod(
              mainModules.comment,
              "allRecords",
              slug as string,
            );
            setCommentContent("");
            queryClient.invalidateQueries({ queryKey: [slug, "Comments"] });
          } catch (error: any) {
            showErrorToast(error.message);
          }
        });
      }
    }

    return (
      <div className={styles.container} ref={ref}>
        <h1 className={styles.title}>
          Comments{" "}
          <span>
            ({allComments.length ?? 0} of{" "}
            {data?.pages[0]?.additionalInfo.commentsCount})
          </span>
        </h1>

        {/* //========================================================================= */}
        {/* //// Add comment section */}
        {/* //========================================================================= */}

        {isCommentsPage ? null : (
          <SignedIn>
            <div
              className={`${styles.write} ${isPending && "pointer-events-none opacity-60"}`}
            >
              <textarea
                name="new_comment"
                placeholder="write a comment..."
                className={styles.input}
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
              />
              <button className={styles.button} onClick={handleAddComment}>
                Send
              </button>
            </div>
          </SignedIn>
        )}

        {/* //========================================================================= */}
        {/* //// Comments section */}
        {/* //========================================================================= */}

        <div className={styles.comments}>
          {isError ? (
            <div className={styles.container}>
              <p
                style={{
                  textAlign: "center",
                  margin: "50px 0px",
                  color: "red",
                }}
              >
                Unable to fetch comments
              </p>
              <p
                style={{
                  textAlign: "center",
                  margin: "50px 0px",
                  color: "red",
                }}
              >
                {error?.message}
              </p>
            </div>
          ) : isCommentsPage ? (
            <div
              ref={listElement}
              style={{
                height: `${rowVirtualizer.getTotalSize()}px`,
                width: "100%",
                position: "relative",
              }}
            >
              {rowVirtualizer.getVirtualItems().map((virtualItem) => {
                const isLoadingElement =
                  hasNextPage && virtualItem.index > allComments.length - 1;
                const Comment = allComments[virtualItem.index];

                return (
                  <div
                    key={virtualItem.index}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: `${virtualItem.size}px`,
                      transform: `translateY(${
                        virtualItem.start - rowVirtualizer.options.scrollMargin
                      }px)`,
                    }}
                  >
                    {isLoadingElement ? (
                      <div></div>
                    ) : (
                      <SingleComment key={Comment.id} item={Comment} />
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            uniqueComments?.map((item: any) => (
              <SingleComment key={item.id} item={item} />
            ))
          )}
        </div>

        {/* //========================================================================= */}
        {/* //// Loading spinner */}
        {/* //========================================================================= */}

        {isFetchingNextPage && (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              margin: "50px 0px",
            }}
          >
            <Spinner />
          </div>
        )}

        {/* //========================================================================= */}
        {/* //// Fetch more error indicator */}
        {/* //========================================================================= */}

        {isFetchNextPageError && (
          <div style={{ width: "100%", textAlign: "center" }}>
            <p
              style={{
                textAlign: "center",
                margin: "50px 0px",
                color: "red",
              }}
            >
              Unable to fetch more comments
            </p>
          </div>
        )}

        {/* //========================================================================= */}
        {/* //// Fetch more btn */}
        {/* //========================================================================= */}

        {allComments.length >= 40 && !canFetchMore ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              margin: "50px 0px",
            }}
          >
            <Button
              style={{
                padding: "12px 18px",
                backgroundColor: "yellowgreen",
                cursor: "pointer",
              }}
              variant={"default"}
              onClick={() => {
                router.push(`/posts/${slug}/comments`);
              }}
            >
              See Full Comments
            </Button>
          </div>
        ) : null}
      </div>
    );
  },
);

CommentsUI.displayName = "CommentsUI";

export default CommentsUI;
