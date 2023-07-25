import styles from "../../styles/Admin/RequestProduct.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useState, useEffect } from "react";
import CustomAlert from "../CustomAlert";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import Link from "next/link";

export default function RequestProduct() {
  const [products, setProducts] = useState([]);

  const { alert, setAlert } = useAppContext();

  const PF = process.env.NEXT_PUBLIC_FOLDER;

//   const searchHandler = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/v1/products/search/${search}`
//       );
//       console.log(search);
//       setProducts(response.data.products);
//     } catch (error) {
//       console.log(error);
//     }
//   };

  const deleteHandler = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/request/${id}`
      );
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
        "http://localhost:5000/api/v1/request/"
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
      <h1 className={styles.title}>Requested Products List</h1>

      <ul className={styles.productsList}>
        {/* <form className={styles.searchContainer} onSubmit={searchHandler}>
          <label htmlFor="search">Search: </label>
          <input
            id="search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form> */}

        <li className={`${styles.product} ${styles.productListHeader}`}>
          <h3>Name</h3>
          <h3>Image</h3>
          <h3>Manufacturer</h3>
          <h3>Requested By</h3>
          <h3>Email</h3>
          <h3>Action</h3>
        </li>

        <hr />

        {products.length > 0 &&
          products?.map((product) => {
            return (
              <>
                <li
                  key={product._id}
                  className={`${styles.product} ${styles.productListHeader}`}
                >
                  <p className={styles.productName}>{product.name}</p>
                  <div className={styles.productImage}>
                    <Link href={`${PF}images/requestedProducts/${product.image}`}>
                      <Image
                        width={100}
                        height={100}
                        src={`${PF}images/requestedProducts/${product.image}`}
                        alt={product.name}
                      />
                    </Link>
                  </div>
                  <p>{product.manufacturerName}</p>

                  <p>
                    {product.requestedBy?.firstName +
                      " " +
                      product.requestedBy?.lastName}
                  </p>

                  <p>{product.requestedBy?.email}</p>

                  <div className={styles.iconsContainer}>
                    <DeleteIcon
                      className={styles.icon}
                      onClick={() => deleteHandler(product?._id)}
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
