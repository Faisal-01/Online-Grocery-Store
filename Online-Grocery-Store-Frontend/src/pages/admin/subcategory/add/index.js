import styles from "@/styles/Admin/AddSubcategory.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAppContext } from "@/context/AppContext";
import CustomAlert from "@/components/CustomAlert";

export default function AddSubcategory() {
  const [subcategory, setSubcategory] = useState({
    name: "",
    image: null,
    category: "",
  });

  const [categories, setCategories] = useState([]);

  const { alert, setAlert } = useAppContext();

  const submitHandler = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("file", subcategory.image);
    formData.append("name", subcategory.name);
    formData.append("category", subcategory.category);

    axios
      .post("http://localhost:5000/api/v1/subcategory", formData)
      .then((response) => {
        setAlert({ status: true, message: response.data });
        setSubcategory({
          name: "",
          image: null,
          category: "",
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getCategories = async () => {
    const options = {
      method: "GET",
      url: "http://localhost:5000/api/v1/category",
    };

    const response = await axios.request(options);
    setCategories(response.data);
  };

  const categoryChangeHandler = (e) => {
    setSubcategory({ ...subcategory, category: e.target.value });
  };

  
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <form className={styles.container} onSubmit={submitHandler}>
      <h1>Add Subcategory</h1>

      <div className={styles.containers}>
        <label htmlFor="image">Image</label>

        <input
          type="file"
          onChange={(e) =>
            setSubcategory({ ...subcategory, image: e.target.files[0] })
          }
          accept="image/*"
        />
      </div>
      <div className={styles.containers}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={subcategory?.name}
          onChange={(e) =>
            setSubcategory({ ...subcategory, name: e.target.value })
          }
        />
      </div>

      <div className={styles.containers}>
        <label htmlFor="name">Category</label>
        <select name="category" id="category" onChange={categoryChangeHandler}>
          <option value="-1">Select Category</option>
          {categories.map((category) => {
            return (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            );
          })}
        </select>
      </div>

      <button type="submit" className={styles.btn}>
        Add
      </button>
      {alert.status && <CustomAlert />}
    </form>
  );
}

AddSubcategory.NoLayout = true;