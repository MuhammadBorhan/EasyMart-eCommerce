import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Layout from "../../components/Layout";
import data from "../../utils/data";

const ProductScreen = () => {
  const { query } = useRouter();
  const { slug } = query;
  const product = data.products.find((item) => item.slug === slug);
  if (!product) {
    return <Layout title="Produt Not Found">Produt Not Found</Layout>;
  }
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
      </div>
    </Layout>
  );
};

export default ProductScreen;
