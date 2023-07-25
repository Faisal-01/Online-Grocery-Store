import styles from "../../styles/Orders.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAppContext } from "@/context/AppContext";
import Order from "@/components/Order";
import ClipLoader from "react-spinners/ClipLoader";

export default function orders() {
  const [orders, setOrders] = useState([]);
  const { navRef, user } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   navRef?.current?.classList.remove("Aside_show__DE3le");
  // }, []);

  const getOrders = async () => {

    try {
      if (user) {
        const response = await axios.get(
          "http://localhost:5000/api/v1/order/user/" + user.id
        );

        setOrders(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, [user]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Orders</h1>

      {isLoading ? (
        <div className={styles.loader}>
          <ClipLoader color={"var(--color-primary-dark)"} size={60} />
        </div>
      ) : (
        <>
          {orders.length > 0 ? (
            <ul className={styles.ordersContainer}>
              <li className={styles.orderContainer}>
                <h4 className={styles.orderHeader}>#</h4>
                <h4 className={styles.orderHeader}>Date</h4>
                <h4 className={styles.orderHeader}>Order Status</h4>
                <h4 className={styles.orderHeader}>Order Items</h4>
                <h4 className={styles.orderHeader}>Order Amount</h4>
                <h4 className={styles.orderHeader}>Payment Method</h4>
                <h4 className={styles.orderHeader}>Details</h4>
              </li>

              {orders.map((order, index) => {
                return (
                  <li className={styles.orderContainer} key={order._id}>
                    <Order order={order} orderNumber={index + 1} />
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className={styles.noOrderContainer}>
              <h1 className={styles.onOrderTitle}>No Order Placed</h1>
            </div>
          )}
        </>
      )}
    </div>
  );
}
