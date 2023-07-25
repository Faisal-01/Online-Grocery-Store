import {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '@/styles/Admin/AdminSingleProduct.module.css';
import Image from 'next/image';

export default function ShowProduct() {
  const [product, setProduct] = useState([]);
  const router = useRouter();

  const PF = process.env.NEXT_PUBLIC_FOLDER;

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

  useEffect(() => {
    getProduct();
  }, [router.isReady]);
  return (
    <div className={styles.container}>
      <h1>Product</h1>

      <div className={styles.containers}>
        {/* <label htmlFor="image">Image</label> */}

        <div className={styles.imageContainer}>
          <Image
            src={`${PF}images/products/${product.image}`}
            width={300}
            height={300}
            alt={product.name}
          />
        </div>
      </div>
      <div className={styles.containers}>
        <label htmlFor="name">Name</label>

        <p>{product.name}</p>
      </div>

      <div className={styles.containers}>
        <label htmlFor="quantity">Quantity</label>

        <p>{product.quantity}</p>
      </div>

      <div className={styles.containers}>
        <label htmlFor="discount">Discount Percentage</label>

        <p>{product.discountPercentage}</p>
      </div>

      <div className={styles.containers}>
        <label htmlFor="price">Price</label>

        <p>{product.price}</p>
      </div>

      <div className={styles.containers}>
        <label htmlFor="category">Category</label>

        <p>{product.category?.name}</p>
      </div>

      <div className={styles.containers}>
        <label htmlFor="subcategory">Subcategory</label>

        <p>{product.subcategory?.name}</p>
      </div>

      <div className={styles.containers}>
        <label htmlFor="featured">Featured</label>

        <p>{product.featured ? "True" : "False"}</p>
      </div>

      <div className={styles.containers}>
        <label htmlFor="topseller">Top Seller</label>

        <p>{product.topSeller ? "True" : "False"}</p>
      </div>
    </div>
  );
}
ShowProduct.NoLayout = true;
