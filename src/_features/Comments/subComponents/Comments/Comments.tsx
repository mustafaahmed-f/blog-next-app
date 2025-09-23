"use client";
import Spinner from "@/_components/Spinner/Spinner";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import useComments from "../../hooks/useComments";
import { getComments } from "../../services/getComments";
import styles from "./comments.module.css";
import CommentsUI from "./CommentsUI";

interface CommentsProps {
  postSlug: string;
  sizeOfComments: number;
  fullComments?: boolean;
}

function Comments({
  postSlug,
  sizeOfComments = 10,
  fullComments,
}: CommentsProps) {
  //todo : get status from clerk

  const commentsSection = useRef<HTMLDivElement | null>(null);
  const loadMoreSection = useRef<HTMLDivElement | null>(null);
  const { desc, setDesc } = useComments();

  const {
    data,
    isFetching,
    isFetchingNextPage,
    isFetchNextPageError,
    isError,
    error,
    isPending,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: [postSlug, "Comments"],
    queryFn: ({ pageParam }) => {
      return getComments(postSlug, pageParam, sizeOfComments);
    },
    initialPageParam: "",
    getNextPageParam: (lastPage) =>
      lastPage.additionalInfo.nextCursor ?? undefined,
    refetchOnWindowFocus: false,
  });

  const allComments = data?.pages.flatMap((page) => page.data) ?? [];

  const canFetchMore = fullComments ? true : allComments.length < 40;

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (
        entries[0].isIntersecting &&
        hasNextPage &&
        !isFetching &&
        !isFetchingNextPage &&
        !isFetchNextPageError &&
        canFetchMore
      ) {
        fetchNextPage();
      }
    });

    if (loadMoreSection.current) {
      intersectionObserver.observe(loadMoreSection.current);
    }

    return () => intersectionObserver.disconnect();
  }, [
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isFetchNextPageError,
  ]);

  if (isPending)
    return (
      <div className={styles.container} style={{ textAlign: "center" }}>
        <Spinner />
      </div>
    );

  return (
    <>
      <CommentsUI
        data={data}
        allComments={allComments}
        isError={isError}
        error={error}
        desc={desc}
        setDesc={setDesc}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isFetchNextPageError={isFetchNextPageError}
        canFetchMore={canFetchMore}
        ref={commentsSection}
      />
      <div ref={loadMoreSection}></div>
    </>
  );
}

export default Comments;
