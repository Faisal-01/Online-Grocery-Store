import styles from '../styles/OrderPlaced.module.css';
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventNoteIcon from "@mui/icons-material/EventNote";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useAppContext } from '@/context/AppContext';
import {useState, useEffect} from 'react';
import Link from 'next/link';
import { useSearchParams } from "next/navigation";
import axios from 'axios';


export default function OrderPlaced(){

  const params = useSearchParams();
  const [orderDetails, setOrderDetails] = useState({});
  const {deliveryAddress, orderTotal, setCartItems, setIsCartAlert, isCartAlert} = useAppContext();
  const [date, setDate] = useState();

  const getSession = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/v1/payment/${params.get("id")}`
    );
    const details = {
      orderAmount: Math.round((response.data.amount_total * 286) / 100) + 150,
      productList: JSON.parse(response.data.metadata.productList),
      shippingAddress: response.data.metadata.shippingAddress,
      orderBy: response.data.metadata.orderBy,
      method: "Card"
    };

    setOrderDetails({
      orderAmount: Math.round((response.data.amount_total * 286) / 100) + 150,
      productList: JSON.parse(response.data.metadata.productList),
      shippingAddress: response.data.metadata.shippingAddress,
      orderBy: response.data.metadata.orderBy,
    });

    saveOrder(details);
  };

  const saveOrder = async (details) => {
    const options = {
      method: "POST",
      url: "http://localhost:5000/api/v1/order",
      data: {
        orderBy: details.orderBy,
        shippingAddress: details.shippingAddress,
        productList: details.productList,
        orderAmount: details.orderAmount,
        method: details.method
      },
    };

    const response = await axios.request(options);
    if (response.data) {
      localStorage.setItem("cart", null);
      setCartItems(null);
      setIsCartAlert({ ...isCartAlert, message: "sdfs" });
    }
  }


  useEffect(() => {
    if(params.get("id")){
      getSession();
    }
  }, [params.get("id")])

  useEffect(() => {
    setDate((prev) => {
      let date = new Date();
      date.setDate(date.getDate() + 1);
      return date.toDateString()
    })
  }, [])
    return (
      <>
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <h1 className={styles.title}>Thank you for your order</h1>
            <h3 className={styles.heading}>Read your details here</h3>

            <div className={styles.detailsContainer}>
              <div className={styles.optionContainer}>
                <MonetizationOnIcon className={styles.priceIcon} />
                <p className={styles.optionText}>Total Cost</p>
                <p className={styles.optionPrice}>{`Rs. ${orderDetails.orderAmount || orderTotal + 150}`}</p>
              </div>

              <div className={styles.optionContainer}>
                <AccessTimeIcon className={styles.timeIcon} />
                <p className={styles.optionText}>Estimated Delivery Time</p>
                <p className={styles.optionPrice}>{`2:00 pm - 5:00 pm`}</p>
              </div>

              <div className={styles.optionContainer}>
                <EventNoteIcon className={styles.dateIcon} />
                <p className={styles.optionText}>Delivery Date</p>
                <p className={styles.optionPrice}>{
                  date
                }
                </p>
              </div>

              <div className={styles.optionContainer}>
                <LocationOnIcon className={styles.addressIcon} />
                <p className={styles.optionText}>Delivery Address</p>
                <p className={styles.optionPrice}>{orderDetails.shippingAddress || deliveryAddress.address}</p>
              </div>
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <Link href={'/'} className={styles.button}>
              Done
            </Link>
          </div>
        </div>
      </>
    );
}