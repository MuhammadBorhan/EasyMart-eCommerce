import Head from "next/head";
import Link from "next/link";
import React from "react";

const Layout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title ? title + " - borhan" : "borhan"}</title>
        <meta name="description" content="eCommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex justify-between items-center bg-white shadow-md h-14 px-4 ">
            <Link href="/" className="text-lg font-bold">
              najibMart
            </Link>
            <div className="flex gap-4">
              <Link href="/">Cart</Link>
              <Link href="/">Login</Link>
            </div>
          </nav>
        </header>

        <main className="container m-auto mt-4 px-4 ">{children}</main>

        <footer className="flex h-10 justify-center items-center shadow-inner ">
          <p>
            Copyright &copy; {new Date().getUTCFullYear()} All Right Reserved By
            Borhan
          </p>
        </footer>
      </div>
    </>
  );
};

export default Layout;
