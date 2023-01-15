import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import { RxCrossCircled, RxMinus, RxPlus } from "react-icons/rx";
import {
  addToCart,
  decrement,
  removeFromCart,
} from "../redux/features/cart/cartSlice";
import { useRouter } from "next/router";

const CartPage = () => {
  const router = useRouter();

  const cartItems = useSelector((state) => state.cart.cart.cartItems);

  // const items = JSON.parse(localStorage.getItem("cartItems"));
  // console.log(items);

  const dispatch = useDispatch();
  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  const increaseQuantity = (item) => {
    if (item.countInStock <= item.quantity) {
      alert("Sorry product is out of stock");
      return;
    }
    dispatch(addToCart(item));
  };

  // const updateCartHandler = (item, qty) => {
  //   const quantity = Number(qty);
  //   // const { data } = await axios.get(`/api/products/${item._id}`);
  //   // if (data.countInStock < quantity) {
  //   //   return toast.error("Sorry. Product is out of stock");
  //   // }
  //   dispatch(addToCart({ ...item, quantity: quantity }));
  //   // toast.success("Product updated in the cart");
  // };

  return (
    <Layout title="Shopping Cart">
      <h1 className="mb-4 text-xl">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div>
          Cart is empty. <Link href="/">Go Shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full ">
              <thead className="border-b">
                <tr>
                  <th className="p-5 text-left">Item</th>
                  <th className="p-5 text-right">Quantity</th>
                  <th className="p-5 text-right">Price</th>
                  <th className="p-5">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.slug} className="border-b">
                    <td>
                      <Link
                        href={`/product/${item.slug}`}
                        className="flex items-center"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                        ></Image>
                        &nbsp;
                        {item.name}
                      </Link>
                    </td>
                    {/* <td className="p-5 text-right">
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartHandler(item, e.target.value)
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </td> */}
                    <td className="p-5 text-right">
                      {" "}
                      <button
                        aria-label="Decrement value"
                        onClick={() => dispatch(decrement(item))}
                        className="border-2 px-4 py-1 rounded"
                      >
                        <RxMinus />
                      </button>
                      <span className="mx-5"> ${item.quantity}</span>
                      <button
                        aria-label="Increment value"
                        onClick={() => increaseQuantity(item)}
                        className="border-2 px-4 py-1 rounded"
                      >
                        <RxPlus />
                      </button>
                    </td>
                    <td className="p-5 text-right">${item.price}</td>
                    <td className="p-5 text-center">
                      <button onClick={() => handleRemoveFromCart(item)}>
                        <RxCrossCircled />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card p-5">
            <ul>
              <li>
                <div className="pb-3 text-xl">
                  Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}) : $
                  {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                </div>
              </li>
              <li>
                <button
                  onClick={() => router.push("login?redirect=/shipping")}
                  className="primary-button w-full"
                >
                  Check Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default CartPage;

/* cartItems?.map((item) => (
  <div>
    <Link href={`/product/${item.slug}`}>
      <img
        width={300}
        src={item.image}
        alt={item.name}
        className="rounded shadow"
      />
    </Link>
    <div className="flex flex-col items-center justify-center p-5">
      <Link href={`/product/${item.slug}`}>
        <h2 className="text-lg">{item.name}</h2>
      </Link>
      <p className="mb-2">{item.brand}</p>
      <p>${item.price}</p>
      <p>quantity: {item.quantity}</p>
    </div>
  </div>
)) */
