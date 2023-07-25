import styles from "../styles/Topbar.module.css";
import ListIcon from "@mui/icons-material/List";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useAppContext } from "@/context/AppContext";
import ItemAddedAlert from "./ItemAddedAlert";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Topbar() {
  const {navRef, isCartAlert, cartItems} = useAppContext();

  const [cartItemCount, setCartItemCount] = useState(0);
  
  const [searchInput, setSearchInput] = useState();

  const {push} = useRouter();

  const menuClickHandler = () => {
    navRef.current.classList.add("Aside_show__DE3le");
  }

  const searchHandler = (e) => {
    e.preventDefault();
    if(searchInput){
      push(`/search/${searchInput.trim()}`);
    }
    else{
      push('/search')
    }
  }

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem('cart'));
    if(data){
      setCartItemCount(data.length);
    }else{
      setCartItemCount(0)
    }
  }, [isCartAlert, cartItems])

  return (
    <div className={styles.topbarContainer}>
      <div className={styles.topbarWrapper}>
        <div className={styles.logoContainer}>
          <div className={styles.menuContainer}>
            <MenuIcon className={styles.menuIcon} onClick={menuClickHandler} />
          </div>
          <Link href={"/"}>
            <Image
              className={styles.logoImage}
              width={100}
              height={100}
              alt="frest cart logo"
              src={"/images/logo bg removed.png"}
            />
          </Link>
          {/* <p className={styles.logoText}>FRESH CART</p> */}
        </div>

        <div className={styles.cartContainer}>
          <Link href={"/cart"}>
            <ShoppingCartIcon className={styles.cartIcon} />
          </Link>

          <div className={styles.cartItemsCount}>{cartItemCount}</div>

          {isCartAlert.status && <ItemAddedAlert />}
        </div>
      </div>

      <div className={styles.topbarBottomContainer}>
        <div className={styles.categoriesContainer}>
          <ListIcon className={styles.categoriesIcon} />
          <Link className={styles.categoriesText} href="/categories">
            Categories
          </Link>
        </div>

        <form className={styles.searchContainer} onSubmit={searchHandler}>
          <input
            className={styles.searchInput}
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            pattern="^[A-Za-z0-9]*$"
            required
            title="Search should not include spaces or special characters"
          />
          <button type="submit" className={styles.searchWrapper}>
            <p className={styles.searchText}>Search</p>
            <SearchIcon className={styles.searchIcon} />
          </button>
        </form>
      </div>
    </div>
  );
}
