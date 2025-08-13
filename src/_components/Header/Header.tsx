import Image from "next/image";
import Link from "next/link";
import AuthLinks from "./AuthLinks";
import ThemeToggle from "./ThemeToggle";

interface HeaderProps {}

function Header({}: HeaderProps) {
  return (
    <div
      className="
    flex items-center justify-between h-[100px]
  "
    >
      {/* Social icons */}
      <div
        className="
      flex gap-[10px] flex-1
      lg:hidden
    "
      >
        <Image src="/facebook.png" alt="facebook" width={24} height={24} />
        <Image src="/instagram.png" alt="instagram" width={24} height={24} />
        <Image src="/tiktok.png" alt="tiktok" width={24} height={24} />
        <Image src="/youtube.png" alt="youtube" width={24} height={24} />
      </div>

      {/* Logo */}
      <div
        className="
      flex-1 text-center text-[36px] font-bold
      xl:text-[32px] 
      md:text-[24px]
      lg:text-left
    "
      >
        lamablog
      </div>

      {/* Links */}
      <div
        className="
      flex items-center gap-[20px] flex-1 text-[20px]
      xl:text-[18px] xl:gap-[15px]
      sm:justify-end
    "
      >
        <ThemeToggle />
        <Link href="/" className="sm:hidden">
          Homepage
        </Link>
        <Link href="/" className="sm:hidden">
          Contact
        </Link>
        <Link href="/" className="sm:hidden">
          About
        </Link>
        <AuthLinks />
      </div>
    </div>
  );
}

export default Header;
