import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Poppins } from "next/font/google";

import "./globals.css";

import { Dosis } from 'next/font/google';

const dosis = Dosis({
  subsets: ['latin'],
  weight: ['400', '600'],
});

// Define font here
const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DALI Link",
  description: "Social Media for DALI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta name="robots" content="noindex"></meta>
      <body className={`${poppins.className} `}>{children}
      {/* <div>Under maintenance</div> */}
      </body>
    </html>
  );
}
