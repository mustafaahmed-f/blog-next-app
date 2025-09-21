"use client";
import Spinner from "@/_components/Spinner/Spinner";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import useComments from "../../hooks/useComments";
import { getComments } from "../../services/getComments";
import styles from "./comments.module.css";
import CommentsUI from "./CommentsUI";

interface CommentsProps {
  postSlug: string;
  sizeOfComments: number;
}

function Comments({ postSlug, sizeOfComments = 10 }: CommentsProps) {
  //todo : get status from clerk

  const commentsSection = useRef<HTMLDivElement | null>(null);
  const loadMoreSection = useRef<HTMLDivElement | null>(null);
  const { toggleHasMore, desc, setDesc } = useComments();

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

  useEffect(() => {
    if (!isFetching && data) {
      if (data?.pages[data.pages.length - 1]?.additionalInfo.hasMore) {
        toggleHasMore(true);
      } else if (!data?.pages[data.pages.length - 1]?.additionalInfo.hasMore) {
        toggleHasMore(false);
      }
    }
  }, [data, isFetching]);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (
        entries[0].isIntersecting &&
        hasNextPage &&
        !isFetching &&
        !isFetchingNextPage &&
        !isFetchNextPageError
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
        isError={isError}
        error={error}
        desc={desc}
        setDesc={setDesc}
        isFetchingNextPage={isFetchingNextPage}
        isFetchNextPageError={isFetchNextPageError}
        ref={commentsSection}
      />
      <div ref={loadMoreSection}></div>
    </>
  );
}

export default Comments;
