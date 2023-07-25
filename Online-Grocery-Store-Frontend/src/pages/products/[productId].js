import axios from "axios";
import { useState, useEffect, useRef } from "react";
import SingleProduct from "@/components/SingleProduct";
import styles from "../../styles/DynamicProduct.module.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Item from "@/components/Item";
import { useRouter } from "next/router";

export default function Product() {
  const [product, setProduct] = useState();
  const [relatedProducts, setRelatedProducts] = useState();

  const relatedProductsRef = useRef(null);
  const router = useRouter();

  const getProduct = async () => {
    const { productId } = router.query;
    const options = {

      method: "GET",
      url: `http://localhost:5000/api/v1/products/${productId}`,
    };

    const response = await axios.request(options);
    setProduct(response.data);
  };

  const getRelatedProducts = async () => {
      const { productId } = router.query;

    const options = {
      method: "GET",
      url: `http://localhost:5000/api/v1/products/similarproducts/${productId}`,
    };

    const response = await axios.request(options);
    setRelatedProducts(response.data);
  };

  const leftButtonHandler = (ref) => {
    if (ref.scrollLeft > 0) {
      ref.scrollLeft -= 300;
    }
  };

  const rightButtonHandler = (ref) => {
    ref.scrollLeft += 300;
  };

  useEffect(() => {
    if (router.isReady) {
      getProduct();
      getRelatedProducts();
    }
  }, [router.isReady, router.query.productId]);

  return (
    <>
      {product && <SingleProduct product={product} />}
      {product && (
        <div className={styles.relatedProductsContainer}>
          <h1
            className={styles.relatedProductsTitle}
          >{relatedProducts && `More ${relatedProducts.subcategory}`}</h1>
          <button
            className={`${styles.buttonLeft} ${styles.scrollButton}`}
            onClick={() => leftButtonHandler(relatedProductsRef.current)}
          >
            <ArrowBackIosIcon />
          </button>
          <button
            className={`${styles.buttonRight} ${styles.scrollButton}`}
            onClick={() => rightButtonHandler(relatedProductsRef.current)}
          >
            <ArrowForwardIosIcon />
          </button>
          <ul className={styles.relatedProductsList} ref={relatedProductsRef}>
            {relatedProducts &&
              relatedProducts.products.map((product) => {
                return (
                  <li key={product?._id} className={styles.relatedProductsItem}>
                    <Item product={product} />
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </>
  );
}
