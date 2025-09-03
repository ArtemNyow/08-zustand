import type { Metadata } from "next";
import{Roboto} from "next/font/google"
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "../components/TanStackProvider/TanStackProvider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display:"swap",
})

export const metadata: Metadata = {
  title: "NoteHub",
  description: "NoteHub – зручний застосунок для створення та організації нотаток.",

  openGraph: {
  title: "NoteHub",
  description: "NoteHub – зручний застосунок для створення та організації нотаток.",
    url: "https://08-zustand-eta-seven.vercel.app/",
 images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub",
      },
    ],
  }
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <Header />
          {children}
           {modal}
          <Footer/>
        </TanStackProvider>
      </body>
    </html>
  );
}
