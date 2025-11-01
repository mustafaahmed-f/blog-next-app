"use client";

import Spinner from "@/_components/Spinner/Spinner";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useTransition } from "react";
import { getPosts } from "../../services/getPosts";
import { getPostsWithCategory } from "../../services/getPostsWithCategory";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import styles from "./cardList.module.css";
import { ensureClientId } from "@/_utils/helperMethods/ensureClientId";

const CardList = ({ page, category }: { page: number; category?: string }) => {
  const clientId = ensureClientId();
  const { 0: isPending, 1: startTransition } = useTransition();
  const POST_PER_PAGE = 3;

  const { data, isFetching, isError, error } = useQuery({
    queryKey: category
      ? [page, category, `main_page_recent_posts_of_${category}`]
      : [page, "main_page_recent_posts"],
    queryFn: () => {
      return category
        ? getPostsWithCategory(category, page, POST_PER_PAGE, clientId)
        : getPosts(page, POST_PER_PAGE, clientId);
    },
    placeholderData: keepPreviousData,
    gcTime: 1000 * 60 * 5,
  });

  const posts = !isFetching && data ? data.data : null;

  const hasPrev = page - 1 > 0;
  const hasNext = data?.additionalInfo.hasNext;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Recent Posts ({data?.additionalInfo.postsCount ?? 0})
      </h1>
      {isFetching ? (
        <div className={styles.container}>
          <div
            style={{
              textAlign: "center",
              margin: "50px 0px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Spinner />
          </div>
        </div>
      ) : isError ? (
        <div className={styles.container}>
          <p style={{ textAlign: "center", margin: "50px 0px", color: "red" }}>
            Unable to fetch posts
          </p>
          <p style={{ textAlign: "center", margin: "50px 0px", color: "red" }}>
            {error?.message}
          </p>
        </div>
      ) : (
        <>
          <div
            className={styles.posts}
            style={isPending ? { opacity: 0.5, pointerEvents: "none" } : {}}
          >
            {posts.length ? (
              posts?.map((item: any) => (
                <div key={item.slug}>
                  <Card item={item} />
                </div>
              ))
            ) : (
              <p>No posts yet.</p>
            )}
          </div>
          <Pagination
            page={page}
            hasPrev={hasPrev}
            hasNext={hasNext}
            startTransition={startTransition}
          />
        </>
      )}
    </div>
  );
};

export default CardList;
