import styles from "@/styles/Admin/UpdateProduct.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { useAppContext } from "@/context/AppContext";
import CustomAlert from "@/components/CustomAlert"; 

export default function UpdateProduct() {
  const [product, setProduct] = useState();
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const router = useRouter();

  const PF = process.env.NEXT_PUBLIC_FOLDER;

  const {alert, setAlert} = useAppContext();

  const getProduct = async () => {
    if (router.isReady) {
      const { id } = router.query;
      const options = {
        method: "GET",
        url: `http://localhost:5000/api/v1/products/${id}`,
      };

      const response = await axios.request(options);
      setProduct(response.data);
    }
  };

  const getCategories = async () => {
      const options = {
        method: "GET",
        url: "http://localhost:5000/api/v1/category",
      };

      const response = await axios.request(options);
      setCategories(response.data);
  
  }

  const getSubcategories = async (category) => {
    if(category === "-1"){
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
  }

  const subcategoryChangeHandler = (e) => {
    setProduct({ ...product, subcategory: e.target.value });
  }
  

  const submitHandler = async (e) => {
    e.preventDefault()
    
    try{
      
        const response = await axios.patch(
          `http://localhost:5000/api/v1/products/${product._id}`,
          {product}
        );
        setAlert({status: true, message: response.data});
    }
    catch(e){
        console.log(e);
    }
  }


  useEffect(() => {
    getProduct();
    getCategories();
  }, [router.isReady]);

  return (
    <form className={styles.container} onSubmit={submitHandler}>
      <h1>Update Product</h1>

      <div className={styles.containers}>
        {/* <label htmlFor="image">Image</label> */}

        <div className={styles.imageContainer}>
          <Image
            src={`${PF}images/products/${product?.image}`}
            width={300}
            height={300}
            alt={product?.name}
          />
        </div>
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
          {product?.category.name && (
            <option value={product?.category._id}>
              {product?.category.name}
            </option>
          )}
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
          {product?.subcategory?.name && (
            <option value={product?.subcategory?._id}>
              {product?.subcategory?.name}
            </option>
          )}
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

      <button type="submit" className={styles.btn}>Update</button>
      {alert.status && <CustomAlert />}
    </form>
  );
}

UpdateProduct.NoLayout = true
