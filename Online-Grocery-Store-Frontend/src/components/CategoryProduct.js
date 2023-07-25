import Link from "next/link";
import styles from "../styles/CategoryProduct.module.css";
import Image from "next/image";
import {useState, useEffect, useRef} from 'react';
import { useAppContext } from "@/context/AppContext";

export default function CategoryProduct({ product }) {

  const [isItemInCart, setIsItemInCart] = useState(false);

  const PF = process.env.NEXT_PUBLIC_FOLDER;

  const { isCartAlert, AddToCartHandler } = useAppContext();

  const addToCartButtonRef = useRef(null);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("cart"))) {
      let data = JSON.parse(localStorage.getItem("cart"));
      if (data.includes(product?._id)) {
        addToCartButtonRef.current.disabled = true;
        setIsItemInCart(true);
      }
    }
  }, [isCartAlert]);
  return (
    <Link className={styles.productContainer} href={`/products/${product?._id}`}>
      <div className={styles.productMainDetails}>
        <Image
          alt={product?.name}
          className={styles.productImage}
          src={`${PF}images/products/${product?.image}`}
          width={100}
          height={100}
        />

        <p className={styles.productName}>
          {product?.name?.length > 30
            ? `${product?.name?.substring(0, 30)}...`
            : product?.name}
        </p>
      </div>

      <div className={styles.productQuantity}>{product?.quantity}</div>

      <div className={styles.productPriceContainer}>
        {product?.discountPercentage ? (
          <>
            <div className={styles.newPrice}>{`Rs. ${parseInt(
              product?.price - product?.price * (product?.discountPercentage / 100)
            )}`}</div>
            <div className={styles.oldPrice}>
              <del>{`Rs. ${parseInt(product.price)}`}</del>
            </div>
          </>
        ) : (
          <div className={styles.price}>{`Rs. ${parseInt(product?.price)}`}</div>
        )}
      </div>

      <div
        style={
          product?.discountPercentage
            ? { visibility: "visible" }
            : { visibility: "hidden" }
        }
        className={styles.productDiscount}
      >
        {`${product?.discountPercentage}% OFF`}
      </div>

      <button
        ref={addToCartButtonRef}
        type="button"
        style={{
          background: isItemInCart ? "grey" : "var(--color-primary-dark)",
          cursor: "pointer"
        }}
        className={styles.AddToCartButton}
        onClick={(e) => AddToCartHandler(e, product._id)}
      >
        {isItemInCart ? "Added to Cart" : "Add To Cart"}
      </button>
    </Link>
  );
}
