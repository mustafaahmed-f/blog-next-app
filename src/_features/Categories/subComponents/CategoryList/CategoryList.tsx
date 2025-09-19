"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./categoryList.module.css";
import ErrorToast from "@/_components/Toasts/ErrorToast";
import { useCategoires } from "@/_context/CategoriesContext";

const CategoryList = () => {
  const { catchedError, fetchedCategories } = useCategoires();
  return (
    <>
      {catchedError && <ErrorToast error={catchedError} />}
      <div className={styles.container}>
        <h1 className={styles.title}>Popular Categories</h1>
        <div className={styles.categories}>
          {fetchedCategories?.map((item: any) => (
            <Link
              href={`/blog?cat=${item.id}`}
              className={`${styles.category} ${styles[item.title]}`}
              key={item.id}
            >
              {item.img && (
                <Image
                  src={item.img}
                  alt=""
                  width={32}
                  height={32}
                  className={styles.image}
                />
              )}
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryList;
