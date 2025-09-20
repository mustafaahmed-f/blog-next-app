"use client";
import { useEffect, useState } from "react";
import styles from "./comments.module.css";
import Link from "next/link";
import Image from "next/image";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Spinner from "@/_components/Spinner/Spinner";
import { getComments } from "../../services/getComments";
import useComments from "../../hooks/useComments";

interface CommentsProps {
  postSlug: string;
}

function Comments({ postSlug }: CommentsProps) {
  //todo : get status from clerk
  const status: string = "unauthenticated";
  const { cursor, desc, hasMore, setCursor, setDesc, toggleHasMore } =
    useComments();

  const { data, isFetching, isError, error, isPending } = useQuery({
    queryKey: [postSlug, "Comments", cursor],
    queryFn: () => {
      return getComments(postSlug, cursor, 5);
    },
    placeholderData: keepPreviousData,
  });

  console.log("Comments : ", data?.data);

  useEffect(() => {
    if (!isFetching && data) {
      if (data.additionalInfo.hasMore) {
        setCursor(data.additionalInfo.nextCursor.toString());
        toggleHasMore(true);
      } else if (!data.additionalInfo.hasMore) {
        toggleHasMore(false);
      }
    }
  }, [data, isFetching]);

  if (isPending)
    return (
      <div className={styles.container} style={{ textAlign: "center" }}>
        <Spinner />
      </div>
    );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Comments <span>({data?.additionalInfo.commentsCount})</span>
      </h1>
      {status === "authenticated" ? (
        <div className={styles.write}>
          <textarea
            placeholder="write a comment..."
            className={styles.input}
            onChange={(e) => setDesc(e.target.value)}
          />
          <button className={styles.button} onClick={() => {}}>
            Send
          </button>
        </div>
      ) : (
        <Link href="/login">Login to write a comment</Link>
      )}
      <div className={styles.comments}>
        {isError ? (
          <div className={styles.container}>
            <p
              style={{ textAlign: "center", margin: "50px 0px", color: "red" }}
            >
              Unable to fetch comments
            </p>
            <p
              style={{ textAlign: "center", margin: "50px 0px", color: "red" }}
            >
              {error?.message}
            </p>
          </div>
        ) : (
          data?.data.map((item: any) => (
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
                  <span className={styles.username}>{item.user.userName}</span>
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
    </div>
  );
}

export default Comments;
