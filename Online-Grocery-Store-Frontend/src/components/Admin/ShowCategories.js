import styles from "../../styles/Admin/ShowCategories.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useState, useEffect } from "react";
import CustomAlert from "../CustomAlert";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import VisibilityIcon from "@mui/icons-material/Visibility";
import UpdateIcon from "@mui/icons-material/Update";
import Link from "next/link";

export default function ShowCategories() {
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");

  const { alert, setAlert } = useAppContext();

  const PF = process.env.NEXT_PUBLIC_FOLDER;

  const searchHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/category/search/${search}`
      );
      setCategories(response.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandler = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/category/${id}`
      );
      setAlert({ status: true, message: response.data });
      setCategories((prev) => {
        return prev.filter((category) => {
          return category._id !== id;
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/category/"
      );
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Categories List</h1>

      <ul className={styles.categoriesList}>
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

        <li className={`${styles.category} ${styles.categoryListHeader}`}>
          <h3>Name</h3>
          <h3>Image</h3>
          <h3>Products Count</h3>
          <h3>Subcategories Count</h3>
          <h3>Action</h3>
        </li>

        <hr />

        {categories?.map((category) => {
          return (
            <>
              <li
                key={category._id}
                className={`${styles.category} ${styles.categoryListHeader}`}
              >
                <p className={styles.categoryName}>{category.name}</p>
                <div className={styles.categoryImage}>
                  <Image
                    width={100}
                    height={100}
                    src={`${PF}images/categories/${category.image}`}
                    alt={category.name}
                  />
                </div>
                <p>{category.productList.length}</p>
                <p>{category.subCategoryList.length}</p>
                <div className={styles.iconsContainer}>
                  <Link
                    href={`/admin/category/show/${category._id}`}
                    className={styles.option}
                  >
                    <VisibilityIcon className={styles.icon} />
                  </Link>
                  <Link
                    href={`/admin/category/update/${category._id}`}
                    className={styles.option}
                  >
                    <UpdateIcon className={styles.icon} />
                  </Link>
                  <DeleteIcon
                    className={styles.icon}
                    onClick={() => deleteHandler(category._id)}
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
