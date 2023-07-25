import styles from '../../styles/Categories.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Categories() {

    const [categories, setCategories] = useState([]);

    const PF = process.env.NEXT_PUBLIC_FOLDER;

    const getCategories = async () => {
    const options = {
      method: "GET",
      url: "http://localhost:5000/api/v1/category/subcategories",
    };

    const response = await axios.request(options);

    setCategories(response.data);

    
  };

  useEffect(() => {
    getCategories();
  }, [])


  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Categories</h1>
      </div>
      {categories.map((category) => {
        return (
          <div className={styles.categoryContainer}>
            <div className={styles.categoryTitleContainer}>
              <h2 className={styles.categoryTitle}>{category.name}</h2>
            </div>

            <ul className={styles.subCategoriesContainer}>
              {category.subcategories.map((subcategory) => {
                return (
                  <li>
                    <Link href={`/subcategories/${subcategory?._id}`} className={styles.subCategory}>
                      <Image
                        src={`${PF}images/subcategories/${subcategory?.image}`}
                        width={200}
                        height={200}
                        className={styles.subCategoryImage}
                        alt={subcategory?.name}
                      />
                      <h3 className={styles.subCategoryName}>
                        {subcategory?.name}
                      </h3>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
