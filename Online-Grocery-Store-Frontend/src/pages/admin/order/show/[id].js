import styles from "@/styles/Admin/AdminSingleOrder.module.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ShowOrder() {
  const [order, setOrder] = useState({});
  const router = useRouter();
  const { id } = router.query;

  const PF = process.env.NEXT_PUBLIC_FOLDER;

  const getOrder = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/order/${id}`
      );
      setOrder(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrder();
  }, [router.isReady]);

  return (
    <div className={styles.container}>
      <div className={styles.orderDetails}>
        <h1 className={styles.title}>Order</h1>

        <div className={styles.totalContainer}>
          <p>Total</p>
          <p>{`Rs. ${order.orderAmount}`}</p>
        </div>

        <div className={styles.deliveryChargesContainer}>
          <p>Delivery Charges</p>
          <p>{`Rs. 150`}</p>
        </div>

        <div className={styles.deliveryAddressContainer}>
          <p>Delivery Address</p>
          <p className={styles.deliveryAddress}>{order.shippingAddress}</p>
        </div>

        <div className={styles.orderStatusContainer}>
          <p>Order Status</p>
          <p>{order.orderStatus}</p>
        </div>

        <div className={styles.orderStatusContainer}>
          <p>Payment Method</p>
          <p>{order.method}</p>
        </div>

        <ul className={styles.itemsContainer}>
          <h3 className={styles.subTitle}>Products</h3>
          <li className={styles.itemContainer}>
            <h4 className={styles.productHeader}>#</h4>
            <h4 className={styles.productHeader}>Image</h4>
            <h4
              className={`${styles.productHeader} ${styles.productHeaderName}`}
            >
              Name
            </h4>
            <h4 className={styles.productHeader}>Quantity</h4>
            <h4 className={styles.productHeader}>Weight</h4>
            <h4 className={styles.productHeader}>Price</h4>
            <h4 className={styles.productHeader}>Subtotal</h4>
          </li>
          {order?.productList?.map((item, index) => {
            return (
              <li className={styles.itemContainer} key={item.product._id}>
                <p className={styles.productNumber}>{index + 1}</p>
                <div className={styles.productImageContainer}>
                  <img
                    className={styles.productImage}
                    src={`${PF}images/products/${item.product.image}`}
                    alt=""
                  />
                </div>
                <p className={styles.productName}>{item.product.name}</p>
                <p className={styles.productQuantity}>{item.productQuantity}</p>

                <p className={styles.productWeight}>{item.product.quantity}</p>
                <p className={styles.productPrice}>{`${
                  item.productDiscount
                    ? item.productPrice -
                      (item.productDiscount * item.productPrice) / 100
                    : item.productPrice
                }`}</p>
                <p className={styles.subTotal}>{`${
                  item.productDiscount
                    ? item.productQuantity *
                      (item.productPrice -
                        (item.productDiscount * item.productPrice) / 100)
                    : item.productQuantity * item.productPrice
                }`}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

ShowOrder.NoLayout = true;
