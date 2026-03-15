import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Parth Kheni – ML Engineer & Robotics Developer",
  description: "Computer Engineering student at Boston University specializing in machine learning, robotics, and embedded systems. Experience at BIDMC and BU Center for Space Physics.",
  keywords: ["Parth Kheni", "Machine Learning", "Robotics", "Computer Engineering", "Boston University", "FPGA", "Embedded Systems", "Portfolio"],
  authors: [{ name: "Parth Kheni", url: "https://github.com/parthnkheni" }],
  creator: "Parth Kheni",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://parthkheni.com",
    title: "Parth Kheni – ML Engineer & Robotics Developer",
    description: "Computer Engineering student at Boston University specializing in machine learning, robotics, and embedded systems.",
    siteName: "Parth Kheni Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Parth Kheni – ML Engineer & Robotics Developer",
    description: "Computer Engineering student at Boston University specializing in machine learning, robotics, and embedded systems.",
    creator: "@parthkheni",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var theme = localStorage.getItem('theme');
                if (theme === 'dark') document.documentElement.classList.add('dark');
              })();
            `,
          }}
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-KVZ0GYH9FB"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-KVZ0GYH9FB');
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
