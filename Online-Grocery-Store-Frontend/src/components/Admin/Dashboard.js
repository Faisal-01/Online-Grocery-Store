import styles from '../../styles/Admin/Dashboard.module.css';

import {useState, useEffect} from 'react';
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PeopleIcon from "@mui/icons-material/People";
import BoyIcon from "@mui/icons-material/Boy";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ReceiptIcon from "@mui/icons-material/Receipt";
import TrafficIcon from "@mui/icons-material/Traffic";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import InventoryIcon from "@mui/icons-material/Inventory";
import AssessmentIcon from "@mui/icons-material/Assessment";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import axios from 'axios';

export default function Dashboard() {

  const [orders, setOrders] = useState("");
  const [products, setProducts] = useState("");
  const [requests, setRequests] = useState("");
  const [customers, setCustomers] = useState("");

  const getOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/order");
      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/products");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getRequests = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/request");
      setRequests(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/user");
      setCustomers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
    getProducts();
    getRequests();
    getCustomers();
  }, [])

  return (
    <div className={styles.dashboard}>
        <div className={styles.topContainers}>
          <div className={styles.topContainer}>
            <AttachMoneyIcon className={styles.icon} />
            <div className={styles.containerDetails}>
              <h1 className={styles.containerTitle}>Revenue</h1>
              <p>540000</p>
            </div>
          </div>
          <div className={styles.topContainer}>
            <CreditCardIcon className={styles.icon} />
            <div className={styles.containerDetails}>
              <h1 className={styles.containerTitle}>Expense</h1>
              <p>150000</p>
            </div>
          </div>
          <div className={styles.topContainer}>
            <ShoppingBagIcon className={styles.icon} />
            <div className={styles.containerDetails}>
              <h1 className={styles.containerTitle}>Daily Orders</h1>
              <p>20</p>
            </div>
          </div>
          <div className={styles.topContainer}>
            <PeopleIcon className={styles.icon} />
            <div className={styles.containerDetails}>
              <h1 className={styles.containerTitle}>Daily Visitors</h1>
              <p>1200</p>
            </div>
          </div>
        </div>

        <div className={styles.itemsContainer}>
          <div className={styles.itemContainer}>
            <div className={styles.itemDetailsContainer}>
              <p>Customers</p>
              <h3>{customers.length}</h3>
            </div>
            <BoyIcon
              className={styles.detailsIcons}
              style={{ color: "blue" }}
            />
          </div>

          <div className={styles.itemContainer}>
            <div className={styles.itemDetailsContainer}>
              <p>Orders</p>
              <h3>{orders.length}</h3>
            </div>
            <ShoppingCartIcon
              className={styles.detailsIcons}
              style={{ color: "green" }}
            />
          </div>

          <div className={styles.itemContainer}>
            <div className={styles.itemDetailsContainer}>
              <p>Average Sale</p>
              <h3>1200</h3>
            </div>
            <ReceiptIcon
              className={styles.detailsIcons}
              style={{ color: "orange" }}
            />
          </div>

          <div className={styles.itemContainer}>
            <div className={styles.itemDetailsContainer}>
              <p>Average Item Sale</p>
              <h3>189</h3>
            </div>
            <AssessmentIcon
              className={styles.detailsIcons}
              style={{ color: "red" }}
            />
          </div>

          <div className={styles.itemContainer}>
            <div className={styles.itemDetailsContainer}>
              <p>Total Sales</p>
              <h3>120000</h3>
            </div>
            <ReceiptLongIcon
              className={styles.detailsIcons}
              style={{ color: "coral" }}
            />
          </div>

          <div className={styles.itemContainer}>
            <div className={styles.itemDetailsContainer}>
              <p>Total Visitors</p>
              <h3>5100</h3>
            </div>
            <TrafficIcon
              className={styles.detailsIcons}
              style={{ color: "blue" }}
            />
          </div>

          <div className={styles.itemContainer}>
            <div className={styles.itemDetailsContainer}>
              <p>Total Products</p>
              <h3>{products.length}</h3>
            </div>
            <InventoryIcon
              className={styles.detailsIcons}
              style={{ color: "brown" }}
            />
          </div>

          <div className={styles.itemContainer}>
            <div className={styles.itemDetailsContainer}>
              <p>Top Selling Item</p>
              <h3>7up 1.5 liters Drink</h3>
            </div>
            <TrendingUpIcon
              className={styles.detailsIcons}
              style={{ color: "green" }}
            />
          </div>

          <div className={styles.itemContainer}>
            <div className={styles.itemDetailsContainer}>
              <p>Item Requests</p>
              <h3>{requests.length}</h3>
            </div>
            <ProductionQuantityLimitsIcon
              className={styles.detailsIcons}
              style={{ color: "red" }}
            />
          </div>
        </div>
      </div>
  )
}
