import styles from "../../styles/Admin/ShowProducts.module.css";
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
  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  const { alert, setAlert } = useAppContext();

  const PF = process.env.NEXT_PUBLIC_FOLDER;

  const searchHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/products/search/${search}`
      );
      console.log(search);
      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandler = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/products/${id}`
      );
      console.log(response.data);
      setAlert({ status: true, message: response.data });
      setProducts((prev) => {
        return prev.filter((product) => {
          return product._id !== id;
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/products/"
      );
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Products List</h1>

      <ul className={styles.productsList}>
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

        <li className={`${styles.product} ${styles.productListHeader}`}>
          <h3>Name</h3>
          <h3>Image</h3>
          <h3>Quantity</h3>
          <h3>Price</h3>
          <h3>Discount</h3>
          <h3>Action</h3>
        </li>

        <hr />

        {products?.map((product) => {
          return (
            <>
              <li
                key={product._id}
                className={`${styles.product} ${styles.productListHeader}`}
              >
                <p className={styles.productName}>{product.name}</p>
                <div className={styles.productImage}>
                  <Image
                    width={100}
                    height={100}
                    src={`${PF}images/products/${product.image}`}
                    alt={product.name}
                  />
                </div>
                <p>{product.quantity}</p>
                <p>{product.price}</p>
                <p>{product.discountPercentage ? product.discountPercentage + "%" : "0%"}</p>
                <div className={styles.iconsContainer}>
                  <Link
                    href={`/admin/products/show/${product._id}`}
                    className={styles.option}
                  >
                    <VisibilityIcon className={styles.icon} />
                  </Link>
                  <Link
                    href={`/admin/products/update/${product._id}`}
                    className={styles.option}
                  >
                    <UpdateIcon className={styles.icon} />
                  </Link>
                  <DeleteIcon
                    className={styles.icon}
                    onClick={() => deleteHandler(product._id)}
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
