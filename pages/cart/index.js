import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const index = () => {
  const cartItems = useSelector((state) => state.cart.cart.cartItems);
  console.log(cartItems);
  return (
    <div>
      {cartItems?.map((item) => (
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
      ))}
    </div>
  );
};

export default index;
