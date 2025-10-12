import Spinner from "@/_components/Spinner/Spinner";
import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

function Page() {
  return (
    <div className="flex h-full items-center justify-center py-12 sm:py-16">
      <SignIn fallback={<Spinner />} oauthFlow="popup" />
    </div>
  );
}

export default Page;
