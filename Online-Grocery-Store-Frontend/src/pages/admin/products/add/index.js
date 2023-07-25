import styles from "@/styles/Admin/AddProduct.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { useAppContext } from "@/context/AppContext";
import CustomAlert from "@/components/CustomAlert";

export default function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: null,
    discountPercentage: "",
    quantity: "",
    category: "",
    subcategory: "",
    featured: false,
    topSeller: false,

  });
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const PF = process.env.NEXT_PUBLIC_FOLDER;

  const { alert, setAlert } = useAppContext();

  const getCategories = async () => {
    const options = {
      method: "GET",
      url: "http://localhost:5000/api/v1/category",
    };

    const response = await axios.request(options);
    setCategories(response.data);
  };

  const getSubcategories = async (category) => {
    if (category === "-1") {
      return;
    }
    const options = {
      method: "GET",
      url: `http://localhost:5000/api/v1/subcategory/subcategories/${category}`,
    };

    const response = await axios.request(options);
    setSubcategories(response.data);
  };

  const categoryChangeHandler = (e) => {
    setProduct({ ...product, category: e.target.value });
    getSubcategories(e.target.value);
  };

  const subcategoryChangeHandler = (e) => {
    setProduct({ ...product, subcategory: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("file", product.image);
    formData.append("name", product.name);
    formData.append("quantity", product.quantity);
    formData.append("discountPercentage", product.discountPercentage);
    formData.append("price", product.price);
    formData.append("category", product.category);
    formData.append("subcategory", product.subcategory);
    formData.append("featured", product.featured);
    formData.append("topSeller", product.topSeller);

    axios
      .post("http://localhost:5000/api/v1/products", formData)
      .then((response) => {
        setAlert({status: true, message: response.data})
        setProduct({
          name: "",
          price: "",
          image: null,
          discountPercentage: "",
          quantity: "",
          category: "",
          subcategory: "",
          featured: false,
          topSeller: false,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <form className={styles.container} onSubmit={submitHandler}>
      <h1>Add Product</h1>

      <div className={styles.containers}>
        {/* <label htmlFor="image">Image</label> */}

        {/* <div className={styles.imageContainer}>
          <Image
            src={`${PF}images/products/${product?.image}`}
            width={300}
            height={300}
            alt={product?.name}
          />
        </div> */}
        <label htmlFor="image">Image</label>

        <input
          type="file"
          onChange={(e) => setProduct({ ...product, image: e.target.files[0] })}
          accept="image/*"
        />
      </div>
      <div className={styles.containers}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={product?.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
        />
      </div>

      <div className={styles.containers}>
        <label htmlFor="quantity">Quantity</label>

        <input
          type="text"
          id="quantity"
          value={product?.quantity}
          onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
        />
      </div>

      <div className={styles.containers}>
        <label htmlFor="discount">Discount Percentage</label>

        <input
          type="text"
          id="discount"
          value={product?.discountPercentage}
          onChange={(e) =>
            setProduct({ ...product, discountPercentage: e.target.value })
          }
        />
      </div>

      <div className={styles.containers}>
        <label htmlFor="price">Price</label>
        <input
          type="text"
          id="price"
          value={product?.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
        />
      </div>

      <div className={styles.containers}>
        <label htmlFor="category">Category</label>

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

      <div className={styles.containers}>
        <label htmlFor="subcategory">Subcategory</label>

        <select
          name="subcategory"
          id="subcategory"
          onChange={subcategoryChangeHandler}
        >
          <option value="-1">Select Subcategory</option>

          {subcategories.map((subcategory) => {
            return (
              <option key={subcategory._id} value={subcategory._id}>
                {subcategory.name}
              </option>
            );
          })}
        </select>
      </div>

      <div className={styles.containers}>
        <label htmlFor="featured">Featured</label>

        <p>{product?.featured ? "True" : "False"}</p>
        <ChangeCircleIcon
          className={styles.icon}
          onClick={() =>
            setProduct({ ...product, featured: !product.featured })
          }
        />
      </div>

      <div className={styles.containers}>
        <label htmlFor="topseller">Top Seller</label>

        <p>{product?.topSeller ? "True" : "False"}</p>
        <ChangeCircleIcon
          className={styles.icon}
          onClick={() =>
            setProduct({ ...product, topSeller: !product.topSeller })
          }
        />
      </div>

      <button type="submit" className={styles.btn}>
        Add
      </button>
      {alert.status && <CustomAlert />}
    </form>
  );
}
AddProduct.NoLayout = true