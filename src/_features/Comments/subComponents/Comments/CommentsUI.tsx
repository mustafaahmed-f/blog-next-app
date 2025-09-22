import { InfiniteData } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import styles from "./comments.module.css";
import { forwardRef } from "react";
import Spinner from "@/_components/Spinner/Spinner";
import SingleComment from "./SingleComment";
import { Button } from "@/_components/ui/button";
import { useParams, useRouter } from "next/navigation";

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
  isFetchingNextPage: boolean;
  isFetchNextPageError: boolean;
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
    },
    ref,
  ) => {
    const { slug } = useParams();
    const router = useRouter();

    const status: string = "unauthenticated";
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
        {status === "authenticated" ? (
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
          ) : (
            uniqueComments?.map((item: any) => (
              <SingleComment key={item.id} item={item} />
            ))
          )}
        </div>
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
        {allComments.length >= 40 ? (
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
