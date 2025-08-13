import Link from "next/link";
import { useState } from "react";

interface AuthLinksProps {}

function AuthLinks({}: AuthLinksProps) {
  const [open, setOpen] = useState(false);
  let status = "unauthenticated";
  return (
    <>
      {status === "unauthenticated" ? (
        <Link href="/login" className="cursor-pointer sm:hidden">
          Login
        </Link>
      ) : (
        <>
          <Link href="/write" className="cursor-pointer sm:hidden">
            Write
          </Link>
          <span className="cursor-pointer sm:hidden" onClick={() => {}}>
            Logout
          </span>
        </>
      )}

      {/* Burger menu */}
      <div
        className="
        w-[20px] h-[16px] flex-col justify-between cursor-pointer hidden
        sm:flex
      "
        onClick={() => setOpen(!open)}
      >
        <div className="w-full h-[2px] bg-[var(--textColor)]"></div>
        <div className="w-full h-[2px] bg-[var(--textColor)]"></div>
        <div className="w-full h-[2px] bg-[var(--textColor)]"></div>
      </div>

      {/* Responsive menu */}
      {open && (
        <div
          className="
          absolute top-[100px] left-0 bg-[var(--bg)]
          h-[calc(100vh-100px)] w-full flex flex-col items-center justify-center
          gap-[50px] text-[36px] z-[999]
        "
        >
          <Link href="/">Homepage</Link>
          <Link href="/">About</Link>
          <Link href="/">Contact</Link>
          {status === "notauthenticated" ? (
            <Link href="/login">Login</Link>
          ) : (
            <>
              <Link href="/write">Write</Link>
              <span className="cursor-pointer">Logout</span>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default AuthLinks;
