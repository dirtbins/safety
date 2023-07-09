"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import Layout from "./components/layout";
const inter = Inter({ subsets: ["latin"] });
import Loading from "./components/loading";
import { Fragment } from "react";
import { usePathname } from "next/navigation";
import Footer from "./components/footer";

export default function RootLayout(props) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body className={inter.className}>
        <Fragment>{pathname !== "/dashboard" && <Layout />}</Fragment>
        {props.children}
        <Footer />
      </body>
    </html>
  );
}
