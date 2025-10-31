import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Footer from "@/_components/Footer/Footer";
import Header from "@/_components/Header/Header";
import Providers from "@/_providers/Providers";
import { Toaster } from "sonner";
import { getFeaturedPosts } from "@/_features/Posts/services/getFeaturedPosts";
import { getCategories } from "@/_features/Categories/services/getCategories";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s - Mustafa Dev Blog App",
    default: "Welcome to Mustafa Dev Blog App",
  },
  description: "The best blog app!",
  icons: {
    icon: "/icons8-blog-logo-32.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let featuredPosts: any = null;
  let catchedError: { catgoriesError: string; postsError: string } = {
    catgoriesError: "",
    postsError: "",
  };
  try {
    //* I was fetching categories here with featured posts
    const [featuredPostsResponse] = await Promise.all([
      getFeaturedPosts().catch((err: any) => {
        catchedError!.postsError = err?.message;
        console.log("Posts error : ", err);
      }),
    ]);

    featuredPosts = featuredPostsResponse?.data;
  } catch (error: any) {
    console.log("Unexpected error : ", error);
    catchedError = {
      catgoriesError: error?.message,
      postsError: error?.message,
    };
  }

  return (
    <ClerkProvider
      appearance={{ baseTheme: dark }}
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="en">
        <body className={`${inter.className} antialiased`}>
          {" "}
          <Providers featuredPosts={featuredPosts} catchedError={catchedError}>
            <div className="container">
              <div className="wrapper">
                <Toaster richColors position="bottom-right" expand={true} />
                <Header />
                {children}
                <Footer />
              </div>
            </div>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
