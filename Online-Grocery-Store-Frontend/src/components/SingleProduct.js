import styles from "../styles/SingleProduct.module.css";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import { useState, useEffect, useRef } from "react";
import Head from "next/head";

export default function SingleProduct({ product }) {

  const PF = process.env.NEXT_PUBLIC_FOLDER;
  
  let price = 0;
  if (product.discountPercentage) {
    price = parseInt(
      product.price - product.price * (product.discountPercentage / 100)
    );

  } else {
    price = product.price
  }

  product.description = `Buy ${
    product.name
  } Online from Fresh Cart. ${
    product.name
  } Price in Pakistan is Rs. ${price} at Fresh Cart. Shop ${product.name} Online.`

   const { AddToCartHandler, isCartAlert } = useAppContext();

   const [isItemInCart, setIsItemInCart] = useState(false);

   const addToCartButtonRef = useRef(null);

   useEffect(() => {
     if (JSON.parse(localStorage.getItem("cart"))) {
       let data = JSON.parse(localStorage.getItem("cart"));
       if (data.includes(product._id)) {
         addToCartButtonRef.current.disabled = true;
         setIsItemInCart(true);
       }
     }
   }, [isCartAlert]);

  return (
    <>
    <Head>
      <title>{`Buy ${product.name} - Fresh Cart`}</title>
    </Head>
      <div className={styles.productContainer}>

        <div className={styles.productWrapper}>
          <div className={styles.productMainDetails}>
            <Image
              alt={product.name}
              className={styles.productImage}
              src={`${PF}images/products/${product.image}`}
              width={400}
              height={400}
            />

            <p className={styles.productName}>
              {product.name}
            </p>
          </div>
          <div className={styles.productQuantity}>{product.quantity}</div>

          <div className={styles.productPriceContainer}>
            {product.discountPercentage ? (
              <>
                <div className={styles.newPrice}>
                  {`Rs. ${parseInt(
                    product.price -
                      product.price * (product.discountPercentage / 100)
                  )}`}

                 
                </div>
                <div className={styles.oldPrice}>
                  <del>{`Rs. ${parseInt(product.price)}`}</del>
                </div>
              </>
            ) : (
              <div className={styles.price}>
                {`Rs. ${parseInt(product.price)}`}
                
              </div>
            )}
          </div>

          <div
            style={product.discountPercentage ? { visibility: "visible" } : {visibility: "hidden"}}
            className={styles.productDiscount}
          >
            {`${product.discountPercentage}% OFF`}
          </div>
        </div>

        <button
          ref={addToCartButtonRef}
          type="button"
          style={{
            background: isItemInCart ? "grey" : "var(--color-primary-dark)",
          }}
          className={styles.AddToCartButton}
          onClick={(e) => AddToCartHandler(e, product._id)}
        >
          {isItemInCart ? "Added to Cart" : "Add To Cart"}
        </button>
      </div>

      <div className={styles.productDescriptionContainer}>
        <h2>About the Item</h2>
        <p className={styles.productDescription}>{product.description}</p>
      </div>
    </>
  );
}
