import styles from "@/styles/Admin/AddCategory.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAppContext } from "@/context/AppContext";
import CustomAlert from "@/components/CustomAlert";

export default function AddCategory() {
  const [category, setCategory] = useState({
    name: "",
    image: null,
  });

  const { alert, setAlert } = useAppContext();

  const submitHandler = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("file", category.image);
    formData.append("name", category.name);

    axios
      .post("http://localhost:5000/api/v1/category", formData)
      .then((response) => {
        setAlert({status: true, message: response.data})
        setCategory({
          name: "",
          image: null,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form className={styles.container} onSubmit={submitHandler}>
      <h1>Add Category</h1>

      <div className={styles.containers}>
        
        <label htmlFor="image">Image</label>

        <input
          type="file"
          onChange={(e) => setCategory({ ...category, image: e.target.files[0] })}
          accept="image/*"
        />
      </div>
      <div className={styles.containers}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={category?.name}
          onChange={(e) => setCategory({ ...category, name: e.target.value })}
        />
      </div>
      

      <button type="submit" className={styles.btn}>
        Add
      </button>
      {alert.status && <CustomAlert />}
    </form>
  );
}
AddCategory.NoLayout = true;
