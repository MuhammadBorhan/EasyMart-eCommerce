import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import { addToCart } from "../../redux/features/cart/cartSlice";
import data from "../../utils/data";
import { Store } from "../../utils/Store";

const ProductScreen = () => {
  // const { state, dispatch } = useContext(Store);
  const dispatch = useDispatch();
  const { query } = useRouter();
  const { slug } = query;
  const product = data.products.find((item) => item.slug === slug);
  if (!product) {
    return <Layout title="Produt Not Found">Produt Not Found</Layout>;
  }

  const router = useRouter();
  const handleAddToCart = () => {
    dispatch(addToCart(product));
    router.push("/cart");
    /*     const existItem = state.cart.cartItems.find(
      (item) => item.slug === product.slug
    );
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (product.countInStock < quantity) {
      alert("Sorry product is out of stock");
      return;
    }
    dispatch({ type: "ADD_TO_CART", payload: { ...product, quantity } }); */
  };
  return (
    <Layout title={product.name}>
      <h1>
        <Link href="/">Back To Product</Link>
      </h1>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
          />
        </div>
        <ul>
          <li className="text-lg">
            <h1>{product.name}</h1>
          </li>
          <li>category: {product.category}</li>
          <li>Brand: {product.brand}</li>
          <li>
            {product.rating} of {product.numReviews} reviews
          </li>
          <li>description: {product.description}</li>
        </ul>
        <div>
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <div>Price</div>
              <div>${product.price}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>
                {product.countInStock > 0 ? "in-stock" : "out-of-stock"}
              </div>
            </div>
            <button onClick={handleAddToCart} className="primary-button w-full">
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductScreen;
