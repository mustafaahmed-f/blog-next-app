"use client";
import Spinner from "@/_components/Spinner/Spinner";
import { queryClient } from "@/_services/TanstackQuery_Client";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
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
      return getComments(postSlug, pageParam as string, sizeOfComments);
    },
    initialPageParam: "",
    getNextPageParam: (lastPage) =>
      lastPage.additionalInfo.nextCursor ?? undefined,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 3,
    gcTime: 1000 * 60 * 3,
    initialData: () => {
      const cached = queryClient.getQueryData<InfiniteData<any>>([
        postSlug,
        "Comments",
      ]);

      if (!cached) return undefined; // 👉 if no cache, let React Query fetch normally

      if (fullComments) {
        return cached; // 👉 use all cached data (All Comments Page)
      }

      // 👉 otherwise, only first 2 pages (Single Post Page)
      return {
        pageParams: cached.pageParams.slice(0, 2),
        pages: cached.pages.slice(0, 2),
      } as InfiniteData<any>;
    },

    select: (data) => {
      if (fullComments) return data; // all pages

      // 👉 only first 2 pages
      return {
        pageParams: data.pageParams.slice(0, 2),
        pages: data.pages.slice(0, 2),
      };
    },
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
    canFetchMore,
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
