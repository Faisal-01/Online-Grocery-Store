import { useState, useEffect } from "react";
import styles from "../styles/Order.module.css";
import LaunchIcon from "@mui/icons-material/Launch";
import Link from 'next/link';

export default function Order({ order, orderNumber }) {
  const [date, setDate] = useState();

  useEffect(() => {
    let newDate = new Date(order.createdAt);
    setDate(
      `${newDate.getDay()}/${newDate.getMonth()}/${newDate.getFullYear()}`
    );
  }, []);

  return (
    <>
      <div className={styles.orderNumber}>{orderNumber}</div>
      <div className={styles.orderDate}>{date}</div>
      <div className={styles.orderStatus}>{order.orderStatus}</div>
      <div className={styles.orderItemsNumber}>{order.productList.length}</div>
      <div className={styles.orderAmount}>{order.orderAmount}</div>
      <div className={styles.orderAmount}>{order.method}</div>
      <Link href={`/orders/${order._id}`} className={styles.icon}>
        <LaunchIcon />
      </Link>
    </>
  );
}
