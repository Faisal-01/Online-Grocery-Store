import {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '@/styles/Admin/AdminSingleSubcategory.module.css';
import Image from 'next/image';

export default function ShowSubcategory() {
  const [subcategory, setSubcategory] = useState([]);
  const router = useRouter();

  const PF = process.env.NEXT_PUBLIC_FOLDER;

  const getSubcategory = async () => {
    if (router.isReady) {
      const { id } = router.query;
      const options = {
        method: "GET",
        url: `http://localhost:5000/api/v1/subcategory/${id}`,
      };

      const response = await axios.request(options);
      setSubcategory(response.data);
    }
  };

  useEffect(() => {
    getSubcategory();
  }, [router.isReady]);
  return (
    <div className={styles.container}>
      <h1>Subcategory</h1>

      <div className={styles.containers}>
        {/* <label htmlFor="image">Image</label> */}

        <div className={styles.imageContainer}>
          <Image
            src={`${PF}images/subcategories/${subcategory.image}`}
            width={300}
            height={300}
            alt={subcategory.name}
          />
        </div>
      </div>
      <div className={styles.containers}>
        <label htmlFor="name">Name</label>

        <p>{subcategory.name}</p>
      </div>

      <div className={styles.productsContainer}>
        <div className={styles.titleContainer}>
          <label>Products</label>
          <p></p>
        </div>

        <div className={styles.products}>
          {subcategory.productList?.map((product) => {
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

ShowSubcategory.NoLayout = true;