import styles from "../styles/CartItem.module.css";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";

export default function CartItem({
  product,
  setCartItemsTotals,
  cartItemsTotals,
  getCartItems,
  setCartItems,
  cartItems
}) {
  const [itemQuantity, setItemQuantity] = useState(1);
  const [total, setTotal] = useState(0);
  const [newPrice, setNewPrice] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const { setIsCartAlert } = useAppContext();

  const PF = process.env.NEXT_PUBLIC_FOLDER;

  const calculateCartItemsTotals = (price) => {
    if (cartItemsTotals.length !== 0) {
      const items = cartItemsTotals.map((item) => {
        if (item.id === product._id) {
          item.total = price * itemQuantity;
        }
        return item;
      });

      setCartItemsTotals(items);
    }
  }

  useEffect(() => {
    setCartItems(cartItems.map((item) => {
      if(item.product._id === product._id){
        item.quantity = itemQuantity
      }
      return item
    }))
  }, [itemQuantity])

  useEffect(() => {
    if (product.discountPercentage) {
      product.newPrice = parseInt(
        product.price - product.price * (product.discountPercentage / 100)
      );

      setCartItemsTotals((prev) => [
        ...prev,
        { id: product._id, total: product.newPrice * itemQuantity },
      ]);
    } else {
      setCartItemsTotals((prev) => [
        ...prev,
        { id: product._id, total: product.price * itemQuantity },
      ]);
    }
  }, []);



  useEffect(() => {
    if (product.discountPercentage) {
      setNewPrice(
        parseInt(
          product.price - product.price * (product.discountPercentage / 100)
        )
      );
      product.newPrice = parseInt(
        product.price - product.price * (product.discountPercentage / 100)
      );

      setTotal(product.newPrice * itemQuantity);
      calculateCartItemsTotals(product.newPrice)


    } else {
      setTotal(product.price * itemQuantity);
       calculateCartItemsTotals(product.price)

    }
  }, [itemQuantity]);
  

  const addQuantityHandler = () => {
    setItemQuantity((prev) => {
      if (prev > 1) {
        setDisabled(false);
        return prev - 1;
      } else {
        return prev;
      }
    });
  };

  const removeQuantityHandler = () => {
    setItemQuantity((prev) => {
      if (prev < 5) {
        return prev + 1;
      } else {
        setDisabled(true);
        return prev;
      }
    });
  };

  const crossHandler = (id) => {
    let items = JSON.parse(localStorage.getItem("cart"));
    items = items.filter((ID) => ID !== id);
    const cartTotal = cartItemsTotals.filter(item => item.id !== id)
    setCartItemsTotals(cartTotal)
    localStorage.setItem("cart", JSON.stringify(items));
    getCartItems();
    setIsCartAlert({status: true, message: "One Item removed from cart"});
  };

  return (
    <div className={styles.itemContainer}>
      <div className={styles.productContainer}>
        <div className={styles.imageContainer}>
          <Image
            src={`${PF}images/products/${product.image}`}
            width={100}
            height={100}
            alt={product.name}
          />
        </div>

        <div className={styles.productDetails}>
          <p className={styles.productName}>
            {product.name.length > 30
              ? `${product.name.substring(0, 30)}...`
              : product.name}
          </p>

          <p className={styles.productQuantity}>{product.quantity}</p>

          <div className={styles.productPriceContainer}>
            {product.discountPercentage ? (
              <>
                <div className={styles.newPrice}>{`Rs. ${newPrice}`}</div>
                <div className={styles.oldPrice}>
                  <del>{`Rs. ${parseInt(product.price)}`}</del>
                </div>
              </>
            ) : (
              <div className={styles.price}>{`Rs. ${parseInt(
                product.price
              )}`}</div>
            )}
            <div>{`x ${itemQuantity}`}</div>
          </div>

          <div className={styles.totalPriceContainer}>
            <div className={styles.totalPrice}>{`Rs. ${total}`}</div>
            <div
              style={
                product.discountPercentage
                  ? { visibility: "visible" }
                  : { visibility: "hidden" }
              }
              className={styles.productDiscount}
            >
              {`${product.discountPercentage}% OFF`}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.controlsContainer}>
        <CloseIcon
          className={styles.crossIcon}
          onClick={() => crossHandler(product._id)}
        />

        <div className={styles.buttonsContainer}>
          <button
            type="button"
            className={styles.removeButton}
            onClick={addQuantityHandler}
          >
            <RemoveIcon className={styles.removeIcon} />
          </button>

          <p className={styles.unitAmount}>{itemQuantity}</p>

          <button
            disabled={disabled}
            style={
              disabled
                ? { backgroundColor: "grey" }
                : { backgroundColor: "var(--color-primary-dark)" }
            }
            type="button"
            className={styles.addButton}
            onClick={removeQuantityHandler}
          >
            <AddIcon className={styles.addIcon} />
          </button>
        </div>
      </div>
    </div>
  );
}
