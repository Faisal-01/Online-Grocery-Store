import styles from "../../styles/Subcategory.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import CategoryProduct from "@/components/CategoryProduct";

export default function Search(props) {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  const getProducts = async () => {
    if (router.isReady) {
      const { query } = router.query;
      const options = {
        method: "GET",
        url: `http://localhost:5000/api/v1/products/search/${query}`,
      };

      const response = await axios.request(options);

      setProducts(response.data);
    }
  };

  useEffect(() => {
    getProducts();
  }, [router.isReady, router.query.query]);

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>
          {/* {products.name && products.name.charAt(0).toUpperCase() + products.name.slice(1)} */}
          {products.query && `Searching for : ${products.query}`}
        </h1>
      </div>

      {products?.products?.length > 0 ? (
        <ul className={styles.productsContainer}>
          {products?.products?.map((product) => {
            return (
              <li key={product._id} className={styles.productContainer}>
                <CategoryProduct product={product} />
              </li>
            );
          })}
        </ul>
      ) : (
        <div className={styles.noProduct}>
          <h1>Sorry! No matching results found</h1>
          <p>Try a different keyword maybe?</p>
        </div>
      )}
    </div>
  );
}
