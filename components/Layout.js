import { Menu } from "@headlessui/react";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Store } from "../utils/Store";
import DropdownLink from "./Dropdownlink";
// import DropdownLink from "./DropdownLink";

const Layout = ({ title, children }) => {
  const { status, data: session } = useSession();
  /*  const { state, dispatch } = useContext(Store);
  const { cart } = state; */
  const cartItems = useSelector((state) => state.cart.cart.cartItems);

  const logoutClickHandler = () => {
    // dispatch({ type: "CART_RESET" });
    signOut({ callbackUrl: "/login" });
  };
  return (
    <>
      <Head>
        <title>{title ? title + " - EasyMart" : "EasyMart"}</title>
        <meta name="description" content="eCommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer position="bottom-center" limit={1} />
      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex justify-between items-center bg-white shadow-md h-14 px-4 ">
            <Link href="/" className="text-lg font-bold">
              najibMart
            </Link>
            <div className="flex gap-4">
              <Link href="/cart" className="p-2">
                Cart
                {cartItems.length > 0 && (
                  <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                    {cartItems.length}
                  </span>
                )}
                {/*  {cart.cartItems.length > 0 && (
                  <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </span>
                )} */}
              </Link>
              {status === "loading" ? (
                "loading"
              ) : session?.user ? (
                <Menu as="div" className="relative inline-block">
                  <Menu.Button className="text-blue-600">
                    {session.user.name}
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white  shadow-lg ">
                    <Menu.Item>
                      <DropdownLink className="dropdown-link" href="/profile">
                        Profile
                      </DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <DropdownLink
                        className="dropdown-link"
                        href="/order-history"
                      >
                        Order History
                      </DropdownLink>
                    </Menu.Item>
                    {/* {session.user.isAdmin && (
                      <Menu.Item>
                        <DropdownLink
                          className="dropdown-link"
                          href="/admin/dashboard"
                        >
                          Admin Dashboard
                        </DropdownLink>
                      </Menu.Item>
                    )} */}
                    <Menu.Item>
                      <a
                        className="dropdown-link"
                        href="#"
                        onClick={logoutClickHandler}
                      >
                        Logout
                      </a>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link href="/login" className="p-2">
                  Login
                </Link>
              )}
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
