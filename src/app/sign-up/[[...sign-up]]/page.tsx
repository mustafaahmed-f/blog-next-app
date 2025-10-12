import { SignUp } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signup",
};

function Page() {
  return (
    <div className="flex h-full items-center justify-center py-12 sm:py-16">
      <SignUp />
    </div>
  );
}

export default Page;
