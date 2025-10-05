import { SignUp } from "@clerk/nextjs";

interface PageProps {}

function Page({}: PageProps) {
  return (
    <div className="flex h-full items-center justify-center py-12 sm:py-16">
      <SignUp />
    </div>
  );
}

export default Page;
