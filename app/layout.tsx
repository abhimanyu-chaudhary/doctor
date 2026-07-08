import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dr. Devesh S. Ballal | Consultant Surgical Oncology & Robotic Surgery",
  description: "Official portfolio of Dr. Devesh S. Ballal, leading surgical oncologist specializing in advanced laparoscopic, robotic colorectal surgery, and cancer care.",
  keywords: "surgical oncologist, robotic surgery, colorectal cancer, oncology, breast cancer, Tata Memorial, Manipal Hospital, Bangalore",
  authors: [{ name: "Dr. Devesh S. Ballal" }],
};

import StyledJsxRegistry from "./registry";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${jakarta.variable}`}>
      <body>
        <StyledJsxRegistry>{children}</StyledJsxRegistry>
      </body>
    </html>
  );
}


