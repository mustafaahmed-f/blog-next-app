import React from "react";
import styles from "./categoryList.module.css";
import Link from "next/link";
import Image from "next/image";
import { getCategories } from "../services/getCategories";
import { showErrorToast } from "@/_utils/helperMethods/showToasts";
import ErrorToast from "@/_components/Toasts/ErrorToast";

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/categories", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const CategoryList = async () => {
  let data: any = null;
  let catchedError: string | null | undefined = null;
  try {
    const response: any = await getCategories();
    data = await response?.data;
  } catch (error: any) {
    console.log("error", error);
    catchedError = error?.message;
  }
  console.log("data", data);
  console.log("catchedError", catchedError);
  // const data = (await getData())
  return (
    <>
      {catchedError && <ErrorToast error={catchedError} />}
      <div className={styles.container}>
        <h1 className={styles.title}>Popular Categories</h1>
        <div className={styles.categories}>
          {data?.map((item: any) => (
            <Link
              href="/blog?cat=style"
              className={`${styles.category} ${styles[item.slug]}`}
              key={item._id}
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
