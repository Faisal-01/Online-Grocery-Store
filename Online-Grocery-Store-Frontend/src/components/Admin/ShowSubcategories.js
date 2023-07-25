import styles from "../../styles/Admin/ShowSubcategories.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useState, useEffect } from "react";
import CustomAlert from "../CustomAlert";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import VisibilityIcon from "@mui/icons-material/Visibility";
import UpdateIcon from "@mui/icons-material/Update";
import Link from "next/link";

export default function ShowSubcategories() {
  const [subcategories, setSubcategories] = useState([]);

  const [search, setSearch] = useState("");

  const { alert, setAlert } = useAppContext();

  const PF = process.env.NEXT_PUBLIC_FOLDER;

  const searchHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/subcategory/search/${search}`
      );
      setSubcategories(response.data.subcategories);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandler = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/subcategory/${id}`
      );
      setAlert({ status: true, message: response.data });
      setSubcategories((prev) => {
        return prev.filter((subcategory) => {
          return subcategory._id !== id;
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/subcategory/"
      );
      setSubcategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Subcategories List</h1>

      <ul className={styles.subcategoriesList}>
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

        <li className={`${styles.subcategory} ${styles.subcategoryListHeader}`}>
          <h3>Name</h3>
          <h3>Image</h3>
          <h3>Products Count</h3>
          <h3>Action</h3>
        </li>

        <hr />

        {subcategories?.map((subcategory) => {
          return (
            <>
              <li
                key={subcategory._id}
                className={`${styles.subcategory} ${styles.subcategoryListHeader}`}
              >
                <p className={styles.categoryName}>{subcategory.name}</p>
                <div className={styles.categoryImage}>
                  <Image
                    width={100}
                    height={100}
                    src={`${PF}images/subcategories/${subcategory.image}`}
                    alt={subcategory.name}
                  />
                </div>
                <p>{subcategory.productList.length}</p>
                <div className={styles.iconsContainer}>
                  <Link
                    href={`/admin/subcategory/show/${subcategory._id}`}
                    className={styles.option}
                  >
                    <VisibilityIcon className={styles.icon} />
                  </Link>
                  <Link
                    href={`/admin/subcategory/update/${subcategory._id}`}
                    className={styles.option}
                  >
                    <UpdateIcon className={styles.icon} />
                  </Link>
                  <DeleteIcon
                    className={styles.icon}
                    onClick={() => deleteHandler(subcategory._id)}
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
