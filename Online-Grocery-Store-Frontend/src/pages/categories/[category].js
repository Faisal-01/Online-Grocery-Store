import styles from "../../styles/Subcategory.module.css";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import CategoryProduct from "@/components/CategoryProduct";

export default function Subcategory(props) {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  const getProducts = async () => {
    if (router.isReady) {
      const { category } = router.query;
      const options = {
        method: "GET",
        url: `http://localhost:5000/api/v1/category/${category}/products`,
      };

      const response = await axios.request(options);

      setProducts(response.data);
    }
  };

  useEffect(() => {
    getProducts();
  }, [router.isReady]);

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>
          {/* {products.name && products.name.charAt(0).toUpperCase() + products.name.slice(1)} */}
          {products.name && products.name}
        </h1>
      </div>

      <ul className={styles.productsContainer}>
        {products?.products?.map((product) => {
          return (
            <li key={product?._id}>
              <CategoryProduct product={product} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
