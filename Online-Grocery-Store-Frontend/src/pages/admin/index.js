import styles from "../../styles/Admin.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import Dashboard from "@/components/Admin/Dashboard";
import Users from "@/components/Admin/Users";
import ShowProducts from "@/components/Admin/ShowProducts";
import Link from "next/link";
import RequestProduct from "@/components/Admin/RequestProduct";
import ShowCategories from "@/components/Admin/ShowCategories";
import ShowSubcategories from '@/components/Admin/ShowSubcategories'
import ShowOrders from "@/components/Admin/ShowOrders";
import { useRouter } from "next/router";
// import AdminProduct from "@/components/Admin/AdminProduct";

export default function Admin() {
  const [active, setActive] = useState(1);

  const {push} = useRouter();

  const activeHandler = (e) => {
    setActive(e.target.dataset["number"]);
  };

  useEffect(() => {
    const token = localStorage.getItem("admin");
    if(!token){
      push("/admin/login")
    }
  }, [])
  return (
    <div className={styles.container}>
      <div className={styles.aside}>
        <div className={styles.logoContainer}>
          <Image
            src="/images/logo bg removed.png"
            alt="logo"
            width={100}
            height={150}
          />
          <h1 className={styles.title}>Admin Panel</h1>
        </div>

        <ul className={`${styles.options}`}>
          <li
            data-number="1"
            className={`${styles.option} ${active == 1 ? styles.active : ""}`}
            onClick={activeHandler}
          >
            Dashboard
          </li>
          <li
            data-number="2"
            className={`${styles.option} ${active == 2 ? styles.active : ""}`}
            onClick={activeHandler}
          >
            Users
          </li>
          <li
            data-number="3"
            onClick={activeHandler}
            className={`${styles.option} ${
              active == 3 || active == 4 ? styles.active : ""
            }`}
          >
            Categories
          </li>
          {(active == "3" || active == "4") && (
            <div className={styles.subOptions}>
              <p data-number="3" onClick={activeHandler}>
                Show Categories
              </p>
              <p>
                <Link
                  href={"/admin/category/add"}
                  data-number="4"
                  onClick={activeHandler}
                >
                  Add Category
                </Link>
              </p>
            </div>
          )}
          <li
            data-number="5"
            onClick={activeHandler}
            className={`${styles.option} ${
              active == 5 || active == 6 ? styles.active : ""
            }`}
          >
            Subcategories
          </li>
          {(active == "5" || active == "6") && (
            <div className={styles.subOptions}>
              <p data-number="5" onClick={activeHandler}>
                Show Categories
              </p>
              <p>
                <Link
                  href={"/admin/subcategory/add"}
                  data-number="6"
                  onClick={activeHandler}
                >
                  Add Subcategory
                </Link>
              </p>
            </div>
          )}
          <li
            data-number="7"
            onClick={activeHandler}
            className={`${styles.option} ${
              active == 7 || active == 8 ? styles.active : ""
            }`}
          >
            Products
          </li>
          {(active == "7" || active == "8") && (
            <div className={styles.subOptions}>
              <p data-number="7" onClick={activeHandler}>
                Show Products
              </p>
              <p>
                <Link
                  href={"/admin/products/add"}
                  data-number="8"
                  onClick={activeHandler}
                >
                  Add Product
                </Link>
              </p>
            </div>
          )}
          <li
            data-number="9"
            className={`${styles.option} ${active == 9 ? styles.active : ""}`}
            onClick={activeHandler}
          >
            Orders
          </li>

          <li
            data-number="10"
            className={`${styles.option} ${active == 10 ? styles.active : ""}`}
            onClick={activeHandler}
          >
            Requested Products
          </li>
        </ul>
      </div>

      <div className={styles.wrapper}>
        {active == "1" && <Dashboard />}
        {active == "2" && <Users />}
        {active == "3" && <ShowCategories />}
        {active == "5" && <ShowSubcategories />}
        {active == "7" && <ShowProducts />}
        {active == "9" && <ShowOrders />}
        {active == "10" && <RequestProduct />}
      </div>
    </div>
  );
}
Admin.NoLayout = true;
