import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { content } from "@/data/content";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
// @ts-ignore
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: content.seo.siteTitle,
    template: `%s | ${content.personal.name}`,
  },
  description: content.seo.siteDescription,
  metadataBase: new URL(content.seo.siteUrl),
  openGraph: {
    title: content.seo.siteTitle,
    description: content.seo.siteDescription,
    url: content.seo.siteUrl,
    siteName: content.seo.siteTitle,
    images: [{ url: content.seo.ogImage, width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: content.seo.siteTitle,
    description: content.seo.siteDescription,
    images: [content.seo.ogImage],
    creator: `@${content.seo.twitterHandle}`,
  },
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} gradient-bg min-h-screen font-sans antialiased`}>
        <ThemeProvider>
          <Navbar />
          <main className="min-h-screen pt-16">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
