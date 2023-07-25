import styles from "@/styles/Admin/AdminLogin.module.css"
import { useAppContext } from "@/context/AppContext";
import { useState } from "react";
import CustomAlert from "@/components/CustomAlert";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
  const { alert, setAlert } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { push } = useRouter();

  async function submitHandler(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/v1/admin/login", {
        email: email,
        password: password,
      });
      push("/admin");
      localStorage.setItem("admin", response.data.token);
    } catch (e) {
      setAlert({ status: true, message: e.response.data });
      console.log(e);
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Fresh Cart Admin Login</h1>

      <form className={styles.loginContainer} onSubmit={submitHandler}>
        <h2>Login</h2>
        <div className={styles.inputContainer}>
          <div className={styles.emailContainer}>
            <label htmlFor="email">Enter Email:</label>

            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.passwordContainer}>
            <label htmlFor="password">Enter Password:</label>

            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button type="submit" className={styles.button}>
          Login
        </button>

        
      </form>
      {alert.status && <CustomAlert />}
    </div>
  );
}

Login.NoLayout = true;