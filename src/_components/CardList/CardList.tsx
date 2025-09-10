import React from "react";
import styles from "./cardList.module.css";
import Image from "next/image";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";

//todo : re-configure the get data method
const getData = async (page: number, cat: string) => {
  const res = await fetch(
    `http://localhost:3000/api/posts?page=${page}&cat=${cat || ""}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const CardList = async ({
  page,
  cat,
}: {
  page: number;
  cat: string | null;
}) => {
  const { posts, count } = { posts: [], count: 1 };

  const POST_PER_PAGE = 2;

  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  return cat ? (
    <div className={styles.container}>
      <h1 className={styles.title}>Recent Posts</h1>
      <div className={styles.posts}>
        {posts?.map((item: any) => (
          <Card item={item} key={item._id} />
        ))}
      </div>
      <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
    </div>
  ) : (
    <div className={styles.container}>
      <p style={{ textAlign: "center", margin: "50px 0px", color: "red" }}>
        Unable to fetch posts
      </p>
    </div>
  );
};

export default CardList;
