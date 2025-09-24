import Spinner from "@/_components/Spinner/Spinner";
import { Button } from "@/_components/ui/button";
import { InfiniteData } from "@tanstack/react-query";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { forwardRef, useRef } from "react";
import styles from "./comments.module.css";
import SingleComment from "./SingleComment";
import { useWindowVirtualizer } from "@tanstack/react-virtual";

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
  desc: string;
  setDesc: (desc: string) => void;
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
      desc,
      setDesc,
      isFetchNextPageError,
      isFetchingNextPage,
      canFetchMore,
      hasNextPage,
    },
    ref,
  ) => {
    const { slug } = useParams();
    const router = useRouter();
    const pathName = usePathname();
    const isCommentsPage = pathName.includes("comments");
    const listElement = useRef<HTMLDivElement | null>(null);

    const rowVirtualizer = useWindowVirtualizer({
      count: hasNextPage ? allComments.length + 1 : allComments.length,
      scrollMargin: listElement.current?.offsetTop ?? 0,
      estimateSize: () => 130,
      measureElement: (el) => el.getBoundingClientRect().height,
      overscan: 4,
    });

    const status: string = "authenticated";
    const uniqueComments = Array.from(
      new Map(
        allComments?.map((comment: any) => [comment.id, comment]),
      ).values(),
    );
    return (
      <div className={styles.container} ref={ref}>
        <h1 className={styles.title}>
          Comments <span>({data?.pages[0]?.additionalInfo.commentsCount})</span>
        </h1>

        {/* //========================================================================= */}
        {/* //// Add comment section */}
        {/* //========================================================================= */}

        {isCommentsPage ? null : status === "authenticated" ? (
          <div className={styles.write}>
            <textarea
              placeholder="write a comment..."
              className={styles.input}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <button className={styles.button} onClick={() => {}}>
              Send
            </button>
          </div>
        ) : (
          <Link href="/login" style={{ color: "yellowgreen" }}>
            Login to write a comment
          </Link>
        )}
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
                (router.push(`/posts/${slug}/comments`), {});
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
