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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
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
