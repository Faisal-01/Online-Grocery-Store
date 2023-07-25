import styles from "../styles/Cart.module.css";
import CartItem from "@/components/CartItem";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import EmptyCart from "@/components/EmptyCart";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";

const Cart = () => {
  const [cartItemsTotals, setCartItemsTotals] = useState([]);
  const [isEmpty, setIsEmpty] = useState(true);
  const { orderTotal, setOrderTotal, cartItems, setCartItems } =
    useAppContext();

  useEffect(() => {
    if (cartItemsTotals.length !== 0) {
      let total = 0;
      cartItemsTotals.forEach((item) => (total = total + item.total));
      setOrderTotal(total);
    } else {
      setOrderTotal(0);
    }
  }, [cartItemsTotals]);

  const getCartItems = async () => {
    const items = JSON.parse(localStorage.getItem("cart"));

    try {
      if (items.length !== 0) {
        const options = {
          method: "POST",
          url: "http://localhost:5000/api/v1/products/multiple",
          data: {
            items,
          },
        };

        const response = await axios.request(options);
        setCartItems(response.data);
        setIsEmpty(false);
      } else {
        setCartItems(null);
        setIsEmpty(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <>
      {!isEmpty ? (
        <div className={styles.container}>
          <div className={styles.cartDetails}>
            <h1 className={styles.title}>
              My Cart ({cartItems?.length || 0}{" "}
              {cartItems?.length === 1 ? "Item" : "Items"})
            </h1>

            <div className={styles.subtotalContainer}>
              <div className={styles.subtotalText}>Subtotal</div>

              <p className={styles.subtotalAmount}>{`Rs. ${orderTotal}`}</p>
            </div>
            <div className={styles.deliveryChargesContainer}>
              <div className={styles.deliveryChargesText}>Delivery Charges</div>

              <p
                className={styles.deliveryChargesAmount}
              >{`Calculated At Checkout`}</p>
            </div>
            <div className={styles.totalContainer}>
              <div className={styles.totalText}>Total</div>

              <p className={styles.totalAmount}>{`Rs. ${orderTotal}`}</p>
            </div>
          </div>

          <ul className={styles.cartItems}>
            {cartItems?.map((item) => {
              return (
                <li key={item.product._id}>
                  <CartItem
                    product={item.product}
                    setCartItemsTotals={setCartItemsTotals}
                    cartItemsTotals={cartItemsTotals}
                    getCartItems={getCartItems}
                    setCartItems={setCartItems}
                    cartItems={cartItems}
                  />
                </li>
              );
            })}
          </ul>

          <div className={styles.checkoutContainer}>
            <Link className={styles.checkoutButton} href={"/checkout"}>
              PROCEED TO CHECKOUT
            </Link>
          </div>
        </div>
      ) : (
        <EmptyCart />
      )}
    </>
  );
};

export default Cart;
