"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./authLinks.module.css";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

interface AuthLinksProps {}

function AuthLinks({}: AuthLinksProps) {
  const [open, setOpen] = useState(false);
  const pathName = usePathname();
  let status = "authenticated";

  useEffect(() => {
    //// Close menu on pathname change
    setOpen(false);
  }, [pathName]);

  return (
    <>
      <SignedOut>
        <SignInButton>
          <button
            className={`cursor-pointer bg-transparent whitespace-nowrap text-black ${styles.link}`}
          >
            Sign In
          </button>
        </SignInButton>
        <SignUpButton>
          <button
            className={`cursor-pointer bg-transparent whitespace-nowrap text-black ${styles.link}`}
          >
            Sign Up
          </button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <Link href="/newpost" className={styles.link}>
          Write
        </Link>
        <div className={`${styles.link} flex items-center`}>
          <UserButton />
        </div>
      </SignedIn>

      <SignedIn>
        <div className="flex items-center sm:hidden">
          <UserButton />
        </div>
      </SignedIn>
      <div className={styles.burger} onClick={() => setOpen(!open)}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>

      {open && (
        <div className={styles.responsiveMenu}>
          <Link href="/">HomePage</Link>
          <Link href="/">Contact</Link>
          <SignedOut>
            <SignInButton>
              <button
                className={`cursor-pointer bg-transparent whitespace-nowrap text-black`}
              >
                Sign In
              </button>
            </SignInButton>
            <SignUpButton>
              <button
                className={`cursor-pointer bg-transparent whitespace-nowrap text-black`}
              >
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link href="/newpost">Write</Link>
          </SignedIn>
        </div>
      )}
    </>
  );
}

export default AuthLinks;
