import { InfiniteData } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import styles from "./comments.module.css";
import { forwardRef } from "react";
import Spinner from "@/_components/Spinner/Spinner";

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
      isError,
      error,
      desc,
      setDesc,
      isFetchNextPageError,
      isFetchingNextPage,
    },
    ref,
  ) => {
    const status: string = "unauthenticated";
    const allComments = data?.pages.flatMap((page) => page.data) ?? [];
    const uniqueComments = Array.from(
      new Map(allComments?.map((comment) => [comment.id, comment])).values(),
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
              <div className={styles.comment} key={item.id}>
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
                    <span className={styles.username}>
                      {item.user.userName}
                    </span>
                    <span className={styles.date}>
                      {item.createdAt.slice(0, 10)}
                    </span>
                  </div>
                </div>
                <p className={styles.desc}>{item.desc}</p>
              </div>
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
      </div>
    );
  },
);

CommentsUI.displayName = "CommentsUI";

export default CommentsUI;
