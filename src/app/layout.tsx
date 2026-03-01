import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "InvoiceMate AU — Simple Invoicing for Australian Tradies",
  description:
    "Create professional GST invoices in seconds. Built for Australian tradies and small businesses. No accounting software, no complexity.",
  keywords: [
    "invoice generator Australia",
    "GST invoice template Australia",
    "invoice for tradies",
    "Australian invoice maker",
    "ABN invoice",
  ],
  openGraph: {
    title: "InvoiceMate AU — Simple Invoicing for Australian Tradies",
    description:
      "Create professional GST invoices in seconds. Built for Australian tradies and small businesses.",
    type: "website",
  },
};

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
