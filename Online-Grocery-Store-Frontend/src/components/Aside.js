import styles from "../styles/Aside.module.css";
import { useEffect, useRef } from "react";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import ChatIcon from "@mui/icons-material/Chat";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import QuizIcon from "@mui/icons-material/Quiz";
import InfoIcon from "@mui/icons-material/Info";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/router";
import axios from 'axios';

export default function Aside() {
  const { navRef, user, setUser } = useAppContext();

  const {push} = useRouter();

  // const shadeRef = useRef(null)

  const getUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/api/v1/user/token`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  
  const logoutHandler = () => {
    localStorage.removeItem("token");
    push("/login")
  }

  useEffect(() => {
    const eventListener = document.addEventListener("click", (e) => {
      if (e.clientX > 300) {
        navRef?.current?.classList.remove("Aside_show__DE3le");
      }
    });

    return () => {
      document.removeEventListener("click", eventListener);
    };
  }, []);

  return (
    <>
      <aside className={`${styles.aside}`} ref={navRef}>
        <h1 className={styles.title}>
          Hello! {user ? `${user.firstName} ${user.lastName}` : "Guest User!"}
        </h1>

        <ul className={styles.options}>
          <li className={styles.option}>
            <Link
              href="/profile"
              className={styles.optionLink}
              onClick={() =>
                navRef?.current?.classList.remove("Aside_show__DE3le")
              }
            >
              <PersonIcon className={styles.icons} />
              <p className={styles.optionName}>My Profile</p>
            </Link>
          </li>

          <li className={styles.option}>
            <Link
              href="/orders"
              className={styles.optionLink}
              onClick={() =>
                navRef?.current?.classList.remove("Aside_show__DE3le")
              }
            >
              <ShoppingBagIcon className={styles.icons} />
              <p className={styles.optionName}>My Orders</p>
            </Link>
          </li>

          <li className={styles.option}>
            <Link
              href={`/request_product`}
              className={styles.optionLink}
              onClick={() =>
                navRef?.current?.classList.remove("Aside_show__DE3le")
              }
            >
              <QuestionAnswerIcon className={styles.icons} />
              <p className={styles.optionName}>Request a Product</p>
            </Link>
          </li>

          <li className={styles.option}>
            <Link
              href="mailto:faisaliqbal012@gmail.com"
              className={styles.optionLink}
              onClick={() =>
                navRef?.current?.classList.remove("Aside_show__DE3le")
              }
            >
              <SupportAgentIcon className={styles.icons} />
              <p className={styles.optionName}>Email Us</p>
            </Link>
          </li>

          <li className={styles.option}>
            <Link
              href="/about"
              className={styles.optionLink}
              onClick={() =>
                navRef?.current?.classList.remove("Aside_show__DE3le")
              }
            >
              <InfoIcon className={styles.icons} />
              <p className={styles.optionName}>About Us</p>
            </Link>
          </li>

          <li className={styles.option}>
            {user ? (
              <button
                className={`${styles.optionLink} ${styles.optionLinkButton}`}
                onClick={logoutHandler}
              >
                <LogoutIcon className={styles.icons} />
                <p className={styles.optionName}>Logout</p>
              </button>
            ) : (
              <Link href="/login" className={styles.optionLink}>
                <LoginIcon className={styles.icons} />
                <p className={styles.optionName}>Login</p>
              </Link>
            )}
          </li>
        </ul>
      </aside>
      
    </>
  );
}
