import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Sree Rajan S | MERN Stack Developer | 3D Portfolio",
  description: "Explore the premium 3D developer portfolio of Sree Rajan S, MERN Stack Developer. Discover full-stack web applications, interactive 3D elements, and modern technical architectures.",
  authors: [{ name: "Sree Rajan S" }],
  keywords: ["MERN Stack Developer", "Full Stack Developer", "3D Portfolio", "React Three Fiber", "Three.js Portfolio", "Next.js 15"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} ${spaceGrotesk.variable} antialiased`}
    >
      <body className="flex flex-col bg-[#030303] text-[#f5f5f7]">
        {children}
      </body>
    </html>
  );
}

