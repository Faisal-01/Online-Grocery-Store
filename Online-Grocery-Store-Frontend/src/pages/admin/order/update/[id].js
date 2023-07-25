import styles from "@/styles/Admin/UpdateOrder.module.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import CustomAlert from "@/components/CustomAlert";
import { useAppContext } from "@/context/AppContext";

export default function UpdateOrder() {
  const [order, setOrder] = useState({});
  const router = useRouter();
  const { id } = router.query;

  const {alert, setAlert} = useAppContext();

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

  const submitHandler = async (e) => {
    e.preventDefault();
    try{
        const response = await axios.patch(
          `http://localhost:5000/api/v1/order/${order._id}`,
          {order}
        );
        setAlert({status: true, message: response.data});
    }
    catch(e){
        console.log(e);
    }
  }

  useEffect(() => {
    getOrder();
  }, [router.isReady]);

  return (
    <div className={styles.container}>
      <form className={styles.orderDetails} onSubmit={submitHandler}>
        <h1 className={styles.title}>Update Order</h1>

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
          <select name="update" id="update" value={order.orderStatus} onChange={(e) => setOrder({...order, orderStatus: e.target.value})}>
            <option value="Active">Active</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className={styles.orderStatusContainer}>
          <p>Payment Method</p>
          <p>{order.method}</p>
        </div>

        <button type="submit" className={styles.submitButton}>Update</button>

        {/* <ul className={styles.itemsContainer}>
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
        </ul> */}
      </form>
      {alert.status && <CustomAlert />}
    </div>
  );
}

UpdateOrder.NoLayout = true;
