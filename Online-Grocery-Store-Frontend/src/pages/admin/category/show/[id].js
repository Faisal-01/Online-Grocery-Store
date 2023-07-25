import {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '@/styles/Admin/AdminSingleCategory.module.css';
import Image from 'next/image';

export default function ShowCategory() {
  const [category, setCategory] = useState([]);
  const router = useRouter();

  const PF = process.env.NEXT_PUBLIC_FOLDER;

  const getCategory = async () => {
    if (router.isReady) {
      const { id } = router.query;
      const options = {
        method: "GET",
        url: `http://localhost:5000/api/v1/category/${id}`,
      };

      const response = await axios.request(options);
      setCategory(response.data);
    }
  };

  useEffect(() => {
    getCategory();
  }, [router.isReady]);
  return (
    <div className={styles.container}>
      <h1>Category</h1>

      <div className={styles.containers}>
        {/* <label htmlFor="image">Image</label> */}

        <div className={styles.imageContainer}>
          <Image
            src={`${PF}images/categories/${category.image}`}
            width={300}
            height={300}
            alt={category.name}
          />
        </div>
      </div>
      <div className={styles.containers}>
        <label htmlFor="name">Name</label>

        <p>{category.name}</p>
      </div>

      <div className={styles.subcategoriesContainer}>
        <div className={styles.titleContainer}>
          <label>Subcategories</label>
          <p></p>
        </div>

        <div className={styles.subcategories}>
          {category.subCategoryList?.map((sub) => {
            return (
              <div key={sub?._id} className={styles.subcategory}>
                <div>{sub?.name}</div>
                <div>
                  <Image
                    width={100}
                    height={100}
                    src={`${PF}images/subcategories/${sub?.image}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.productsContainer}>
        <div className={styles.titleContainer}>
          <label>Products</label>
          <p></p>
        </div>

        <div className={styles.products}>
          {category.productList?.map((product) => {
            return (
              <div key={product?._id} className={styles.product}>
                <div>{product?.name}</div>
                <div>
                  <Image
                    width={100}
                    height={100}
                    src={`${PF}images/products/${product?.image}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
ShowCategory.NoLayout = true;
