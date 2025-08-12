import Image from "next/image";
import Link from "next/link";

interface FooterProps {}

function Footer({}: FooterProps) {
  return (
    <div
      className="
        mt-[50px] py-5 flex items-center justify-between 
        text-[var(--softTextColor)]
        md:flex-col md:gap-[50px]
      "
    >
      {/* Info Section */}
      <div className="flex-1 flex flex-col gap-[14px]">
        <div className="flex items-center gap-[10px]">
          <Image src="/logo.png" alt="lama blog" width={50} height={50} />
          <h1 className="text-2xl">Lamablog</h1>
        </div>
        <p className="font-light">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim
          necessitatibus similique aspernatur obcaecati veritatis. Aperiam cum
          porro sequi, totam minima consequuntur, aspernatur deleniti vero
          repellendus dorales.
        </p>
        <div className="mt-[10px] flex gap-[10px]">
          <Image src="/facebook.png" alt="" width={18} height={18} />
          <Image src="/instagram.png" alt="" width={18} height={18} />
          <Image src="/tiktok.png" alt="" width={18} height={18} />
          <Image src="/youtube.png" alt="" width={18} height={18} />
        </div>
      </div>

      {/* Links Section */}
      <div
        className="
          flex-1 flex justify-end gap-[100px] 
          lg:gap-[50px] 
          md:w-full md:justify-between 
          sm:text-sm
        "
      >
        {/* Links List */}
        <div className="flex flex-col gap-[10px] font-light">
          <span className="font-bold">Links</span>
          <Link href="/">Homepage</Link>
          <Link href="/">Blog</Link>
          <Link href="/">About</Link>
          <Link href="/">Contact</Link>
        </div>

        {/* Tags List */}
        <div className="flex flex-col gap-[10px] font-light">
          <span className="font-bold">Tags</span>
          <Link href="/">Style</Link>
          <Link href="/">Fashion</Link>
          <Link href="/">Coding</Link>
          <Link href="/">Travel</Link>
        </div>

        {/* Social List */}
        <div className="flex flex-col gap-[10px] font-light">
          <span className="font-bold">Social</span>
          <Link href="/">Facebook</Link>
          <Link href="/">Instagram</Link>
          <Link href="/">Tiktok</Link>
          <Link href="/">Youtube</Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
