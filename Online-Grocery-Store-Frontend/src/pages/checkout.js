import styles from "../styles/Checkout.module.css";
import { useState, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/router";
import axios from 'axios';

export default function Checkout() {
  const {
    deliveryAddress,
    setDeliveryAddress,
    orderTotal,
    user,
    cartItems
  } = useAppContext();
  
  const { isCartAlert, setIsCartAlert, setCartItems } = useAppContext();

  const [address, setAddress] = useState("University Town, Mailsi Road, Vehari");
  const [paymentOption, setPaymentOption] = useState("COD");
  const {push} = useRouter();

  const updateHandler = () => {
    if(deliveryAddress.address.length === 0){
      alert("Please enter a valid address")
      return
    }
    setAddress(deliveryAddress.address)
    setDeliveryAddress({...deliveryAddress, show: false})
  
  }
  
  const placeOrderHandler = async () => {
    if(!localStorage.getItem("token")){
      push('/login')
      return
    }
    const productList = cartItems.map((item) => {
      if (item.product.discountPercentage)
      {
        return {
          productId: item.product._id,
          productPrice: item.product.price,
          productDiscount: item.product.discountPercentage,
          productQuantity: item.quantity,
        };
      }
        return {
          productId: item.product._id,
          productPrice: item.product.price,
          productQuantity: item.quantity,
        };
    })

    try {
      if (paymentOption === "COD") {
        const options = {
          method: "POST",
          url: "http://localhost:5000/api/v1/order",
          data: {
            orderBy: user.id,
            shippingAddress: address,
            productList: productList,
            orderAmount: orderTotal + 150,
          },
        };

        const response = await axios.request(options);
        if (response.data) {
          localStorage.setItem("cart", null);
          setCartItems(null);
          setIsCartAlert({ ...isCartAlert, message: "sdfs" });
          push("/order_placed");
        }
      } else {
        const options = {
          method: "POST",
          url: "http://localhost:5000/api/v1/payment",
          data: {
            orderBy: user.id,
            shippingAddress: address,
            productList: productList,
            orderAmount: orderTotal + 150,
          },
        };
        const response = await axios.request(options);
        window.location = response.data.session.url;
      }
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    if(!orderTotal){
      push('/cart')
    }
  }, [])

  useEffect(() => {
        setDeliveryAddress({ ...deliveryAddress, address: address });

  }, [])


  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.heading}>Checkout</h1>

        <div className={styles.deliveryAddressContainer}>
          <div className={styles.addressContainer}>
            <p className={styles.addressTitle}>Your Delivery Address</p>
            <p className={styles.address}>{address}</p>
          </div>

          <button
            type="button"
            className={styles.changeDeliveryButton}
            onClick={() =>
              setDeliveryAddress({
                ...deliveryAddress,
                show: !deliveryAddress.show,
              })
            }
          >
            {"Change"}
          </button>
        </div>
        {deliveryAddress.show && (
          <div className={styles.changeAddressContainer}>
            <input
              type="text"
              value={deliveryAddress.address}
              onChange={(e) =>
                setDeliveryAddress({
                  ...deliveryAddress,
                  address: e.target.value,
                })
              }
            />

            <button onClick={updateHandler}>OK</button>
          </div>
        )}

        <div className={styles.orderSummaryContainer}>
          <h1 className={styles.orderTitle}>Order Summary</h1>

          <div className={styles.subtotalContainer}>
            <p className={styles.subtotal}>Sub Total</p>

            <p className={styles.subtotalAmount}>{`Rs. ${orderTotal}`}</p>
          </div>

          <div className={styles.deliveryChargesContainer}>
            <p className={styles.deliveryCharges}>Delivery Charges</p>

            <p className={styles.deliveryChargesAmount}>{`Rs. ${150}`}</p>
          </div>

          <div className={styles.totalBillContainer}>
            <div className={styles.savingsContainer}>
              <p className={styles.totalBill}>Total Bill</p>
            </div>

            <div className={styles.totalBillAmount}>
              <p>{`Rs. ${orderTotal + 150}`}</p>
            </div>
          </div>
        </div>

        <div className={styles.paymentMethodContainer}>
          <h1 className={styles.paymentMethodTitle}>Payment Method</h1>

          <div className={styles.paymentMethods}>
            <div className={styles.cashOnDeliveryContainer}>
              <input
                type="radio"
                id="cash"
                name="paymentMethod"
                value="COD"
                checked={paymentOption === "COD"}
                onChange={(e) => setPaymentOption(e.target.value)}
              />
              <label htmlFor="cash">Cash On Delivery</label>
            </div>
            <div className={styles.cardPaymentContainer}>
              <input
                type="radio"
                id="card"
                name="paymentMethod"
                value="Card"
                checked={paymentOption === "Card"}
                onChange={(e) => setPaymentOption(e.target.value)}
              />
              <label htmlFor="card">Card Payment</label>
            </div>
          </div>
          <button
            type="button"
            className={styles.placeOrderButton}
            onClick={placeOrderHandler}
          >
            <p>Place Order</p>
            <p className={styles.amount}>{`Rs. ${orderTotal + 150}`}</p>
          </button>
        </div>
      </div>
    </>
  );
}
