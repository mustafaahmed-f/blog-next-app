import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/_components/Footer/Footer";
import Header from "@/_components/Header/Header";
import Providers from "@/_providers/Providers";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s - Lama Dev Blog App",
    default: "Welcome to Lama Dev Blog App",
  },
  description: "The best blog app!",
  icons: {
    icon: "/icons8-blog-logo-32.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {" "}
        <Providers>
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
  );
}
