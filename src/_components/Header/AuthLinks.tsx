"use client";
import Link from "next/link";
import { useState } from "react";
import styles from "./authLinks.module.css";

interface AuthLinksProps {}

function AuthLinks({}: AuthLinksProps) {
  const [open, setOpen] = useState(false);
  let status = "authenticated";
  return (
    <>
      {status === "unauthenticated" ? (
        <Link href="/login" className={styles.link}>
          Login
        </Link>
      ) : (
        <>
          <Link href="/newpost" className={styles.link}>
            Write
          </Link>
          <span className={styles.link} onClick={() => {}}>
            Logout
          </span>
        </>
      )}
      <div className={styles.burger} onClick={() => setOpen(!open)}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
      {open && (
        <div className={styles.responsiveMenu}>
          <Link href="/">HomePage</Link>
          <Link href="/">Contact</Link>
          {status === "notauthenticated" ? (
            <Link href="/login">Login</Link>
          ) : (
            <>
              <Link href="/write">Write</Link>
              <span className={styles.link}>Logout</span>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default AuthLinks;
