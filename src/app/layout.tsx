import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SessionProvider } from "@/components/providers/session-provider";
import { WishlistProvider } from "@/components/providers/wishlist-provider";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: {
    default: "StudioSpace | Peer-to-Peer Creative Studio Rentals",
    template: "%s | StudioSpace",
  },
  description:
    "Discover, compare and book photography studios, film stages, podcast lounges, music suites and art workshops by the hour.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <SessionProvider>
            <WishlistProvider>
              <Navbar />
              <div className="flex-1">{children}</div>
              <Footer />
              <Toaster richColors closeButton position="top-right" />
            </WishlistProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
