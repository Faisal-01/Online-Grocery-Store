import styles from "../../styles/Admin/ShowOrders.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useState, useEffect } from "react";
import CustomAlert from "../CustomAlert";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import VisibilityIcon from "@mui/icons-material/Visibility";
import UpdateIcon from "@mui/icons-material/Update";
import Link from "next/link";

export default function ShowProducts() {
  const [orders, setOrders] = useState([]);

  const [search, setSearch] = useState("");

  const { alert, setAlert } = useAppContext();

  const PF = process.env.NEXT_PUBLIC_FOLDER;

  const searchHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/order/search/${search}`
      );
      setOrders(response.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandler = async (id, userId) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/v1/order/delete/${id}`, {userId}
      );
      setAlert({ status: true, message: response.data });
      setOrders((prev) => {
        return prev.filter((order) => {
          return order._id !== id;
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/order/");
      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Orders List</h1>

      <ul className={styles.ordersList}>
        <form className={styles.searchContainer} onSubmit={searchHandler}>
          <label htmlFor="search">Search: </label>
          <input
            id="search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {/* <button type="submit">Search</button> */}
        </form>

        <li className={`${styles.order} ${styles.orderListHeader}`}>
          <h3>Date</h3>
          <h3>Status</h3>
          <h3>Items</h3>
          <h3>Amount</h3>
          <h3>Payment Method</h3>
          <h3>Action</h3>
        </li>

        <hr />

        {orders?.map((order) => {
            let newDate = new Date(order.createdAt);
            newDate = `${newDate.getDay()}/${newDate.getMonth()}/${newDate.getFullYear()}`;
          return (
            <>
              <li
                key={order._id}
                className={`${styles.order} ${styles.orderListHeader}`}
              >
                <p className={styles.orderDate}>{newDate}</p>
                <p>{order.orderStatus}</p>
                <p>{order.productList.length}</p>
                <p>{order.orderAmount}</p>
                <p>{order.method}</p>
                <div className={styles.iconsContainer}>
                  <Link
                    href={`/admin/order/show/${order._id}`}
                    className={styles.option}
                  >
                    <VisibilityIcon className={styles.icon} />
                  </Link>
                  <Link
                    href={`/admin/order/update/${order._id}`}
                    className={styles.option}
                  >
                    <UpdateIcon className={styles.icon} />
                  </Link>
                  <DeleteIcon
                    className={styles.icon}
                    onClick={() => deleteHandler(order._id, order.orderBy)}
                  />
                </div>
              </li>
              <hr />
            </>
          );
        })}
      </ul>
      {alert.status && <CustomAlert />}
    </div>
  );
}
