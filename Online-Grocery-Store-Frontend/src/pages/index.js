
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useRef, useEffect, useState, createRef } from "react";
import Item from "@/components/Item";
import axios from "axios";
import Category from "@/components/HomePageCategory";

import Carousel from "react-material-ui-carousel";
import CarouselItem from "../components/CarouselItem";

import ClipLoader from "react-spinners/ClipLoader";



export default function Home() {
  const categoriesRef = useRef(null);
  const topSellerRef = useRef(null);
  const featuredRef = useRef(null);
  const customCategoriesRefs = useRef([])
  const [categories, setCategories] = useState();
  const [topSellerProducts, setTopSellerProducts] = useState();
  const [featuredProducts, setFeaturedProducts] = useState();
  const [customCategories, setCustomCategories] = useState();
  const [subcategoriesOfCategories, setSubcategoriesOfCategories] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const PF = process.env.NEXT_PUBLIC_FOLDER;

  const leftButtonHandler = (ref) => {
    if (ref.scrollLeft > 0) {
      ref.scrollLeft -= 300;
    }
  };

  const rightButtonHandler = (ref) => {
    ref.scrollLeft += 300;
    
  };

  const getCategories = async () => {
    const options = {
      method: "GET",
      url: "http://localhost:5000/api/v1/category",
    };

    const response = await axios.request(options);
    setCategories(response.data);
  };

  const getTopSellerProducts = async () => {
    const options = {
      method: "GET",
      url: "http://localhost:5000/api/v1/products/topseller",
    };

    const response = await axios.request(options);
    setTopSellerProducts(response.data);
  };

  const getFeaturedProducts = async () => {
    const options = {
      method: "GET",
      url: "http://localhost:5000/api/v1/products/featured",
    };

    const response = await axios.request(options);
    setFeaturedProducts(response.data);
  };

  const getCustomCategories = async () => {
    const options = {
      method: "GET",
      url: "http://localhost:5000/api/v1/products/customcategories",
    };

    const response = await axios.request(options);
    setIsLoading(false)
    setCustomCategories(response.data);

    
  };

  const getSubcategoriesOfCategories  = async () => {
    const options = {
      method: "GET",
      url: "http://localhost:5000/api/v1/category/subcategories",
    };

    const response = await axios.request(options);

    setSubcategoriesOfCategories(response.data);
  };

  useEffect(() => {
    customCategoriesRefs.current = customCategoriesRefs.current.slice(
      0,
      customCategories?.length
    );
  }, [customCategories]);

  useEffect(() => {
    getCategories();
    getTopSellerProducts();
    getFeaturedProducts();
    getCustomCategories();
    getSubcategoriesOfCategories()
  }, []);

   var items = [
     {
       img: "./images/carousel/1.webp",
     },
     {
       img: "./images/carousel/2.webp",
     },

     {
       img: "./images/carousel/3.webp",
     },
     {
       img: "./images/carousel/4.webp",
     },
   ];



  return (
    <>
      <div className={styles.container}>
        <div className={styles.categoriesContainer}>
          <button
            className={`${styles.buttonLeft} ${styles.scrollButton}`}
            onClick={() => leftButtonHandler(categoriesRef.current)}
          >
            <ArrowBackIosIcon />
          </button>
          <button
            className={`${styles.buttonRight} ${styles.scrollButton}`}
            onClick={() => rightButtonHandler(categoriesRef.current)}
          >
            <ArrowForwardIosIcon />
          </button>
          <ul className={styles.categories} ref={categoriesRef}>
            {categories &&
              categories.map((c) => {
                return <Category key={c._id} category={c} />;
              })}
          </ul>
        </div>

        <div className={styles.topSellerContainer}>
          <h1 className={styles.topSellerTitle}>Top Seller</h1>
          <button
            className={`${styles.buttonLeft} ${styles.scrollButton}`}
            onClick={() => leftButtonHandler(topSellerRef.current)}
          >
            <ArrowBackIosIcon />
          </button>
          <button
            className={`${styles.buttonRight} ${styles.scrollButton}`}
            onClick={() => rightButtonHandler(topSellerRef.current)}
          >
            <ArrowForwardIosIcon />
          </button>
          <ul className={styles.topSellerList} ref={topSellerRef}>
            {topSellerProducts &&
              topSellerProducts.map((product) => {
                return (
                  <li key={product._id} className={styles.topSellerItem}>
                    <Item product={product} />
                  </li>
                );
              })}
          </ul>
        </div>

        <Carousel>
          {items.map((item, i) => (
            <CarouselItem key={i} item={item} />
          ))}
        </Carousel>

        <div className={styles.featuredContainer}>
          <h1 className={styles.featuredTitle}>Featured Products</h1>
          <button
            className={`${styles.buttonLeft} ${styles.scrollButton}`}
            onClick={() => leftButtonHandler(featuredRef.current)}
          >
            <ArrowBackIosIcon />
          </button>
          <button
            className={`${styles.buttonRight} ${styles.scrollButton}`}
            onClick={() => rightButtonHandler(featuredRef.current)}
          >
            <ArrowForwardIosIcon />
          </button>
          <ul className={styles.featuredList} ref={featuredRef}>
            {featuredProducts &&
              featuredProducts.map((product) => {
                return (
                  <li key={product._id} className={styles.featuredItem}>
                    <Item product={product} />
                  </li>
                );
              })}
          </ul>
        </div>

        {!isLoading ? (
          customCategories?.map((category, i) => {
            if (category) {
              return (
                <div
                  key={category._id}
                  className={styles.CustomCategoriesContainer}
                >
                  <h1 className={styles.CustomCategoriesTitle}>
                    {category.title}
                  </h1>
                  <button
                    className={`${styles.buttonLeft} ${styles.scrollButton}`}
                    onClick={() =>
                      leftButtonHandler(customCategoriesRefs.current[i])
                    }
                  >
                    <ArrowBackIosIcon />
                  </button>
                  <button
                    className={`${styles.buttonRight} ${styles.scrollButton}`}
                    onClick={() =>
                      rightButtonHandler(customCategoriesRefs.current[i])
                    }
                  >
                    <ArrowForwardIosIcon />
                  </button>
                  <ul
                    className={styles.CustomCategoriesList}
                    ref={(el) => (customCategoriesRefs.current[i] = el)}
                  >
                    {category.products &&
                      category.products.map((product) => {
                        return (
                          <li
                            key={product?.id}
                            className={styles.CustomCategoriesItem}
                          >
                            <Item product={product} />
                          </li>
                        );
                      })}
                  </ul>
                </div>
              );
            }
          })
        ) : (
          <div className={styles.loader}>
            <ClipLoader color={"var(--color-primary-dark)"} />
          </div>
        )}

        <div className={styles.categoriesListContainer}>
          <h1 className={styles.categoriesListTitle}>Categories</h1>

          <div className={styles.categoriesList}>
            {subcategoriesOfCategories &&
              subcategoriesOfCategories.map((category) => {
                return (
                  <div>
                    <Link
                      key={category._id}
                      href={`/categories/${category._id}`}
                    >
                      <h4 className={styles.categoryName}>{category.name}</h4>
                    </Link>

                    {category.subcategories.map((subcategory) => {
                      return (
                        <>
                          <Link href={`/subcategories/${subcategory?._id}`}>
                            <p>- {subcategory?.name}</p>
                          </Link>
                        </>
                      );
                    })}
                  </div>
                );
              })}
          </div>
        </div>

        <div className={styles.categoriesBottom}>
          <h1 className={styles.categoriesBottomTitle}>
            FreshCart - Online Grocery Shopping
          </h1>

          <div className={styles.categoriesBottomDetails}>
            <div className={styles.categoriesBottomDetail}>
              <h2 className={styles.categoriesBottomHeading}>
                Online grocery store in Pakistan
              </h2>
              <p className={styles.categoriesBottomText}>
                Order online. All your favourite products from the low price
                online supermarket for grocery home delivery in Lahore,
                Pakistan. Best experience guaranteed.
              </p>
            </div>

            <div className={styles.categoriesBottomDetail}>
              <h2 className={styles.categoriesBottomHeading}>
                One stop shop for all your daily needs
              </h2>
              <p className={styles.categoriesBottomText}>
                GrocerApp is a low-price online supermarket that allows you to
                order products across categories like grocery, vegetables,
                beauty & wellness, household care, baby care, pet care and meats
                & seafood and gets them delivered to your doorstep.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

