import styles from "../../styles/Admin/Users.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useState, useEffect } from "react";
import CustomAlert from "../CustomAlert";
import { useAppContext } from "@/context/AppContext";

export default function Users() {
  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState("");

  const { alert, setAlert } = useAppContext();

  const searchHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/user/search",
        { search }
      );
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandler = async (id) => {
    try {
      const response = await axios.delete(
        "http://localhost:5000/api/v1/user/" + id
      );
      console.log(response.data);
      setAlert({ status: true, message: response.data.message });
      setUsers((prev) => {
        return prev.filter((user) => {
          return user._id !== id;
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/user/");
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Users List</h1>

      <ul className={styles.usersList}>
        <form className={styles.searchContainer} onSubmit={searchHandler}>
          <label htmlFor="search">Search: </label>
          <input
            id="search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {/* <button type="submit">Search</button> */}
        </form>

        <li className={`${styles.user} ${styles.userListHeader}`}>
          <h3>ID</h3>
          <h3>Name</h3>
          <h3>Email</h3>
          <h3>Phone Number</h3>
          <h3>Orders</h3>
          <h3>Action</h3>
        </li>

        <hr />

        {users?.map((user) => {
          return (
            <>
              <li
                key={user._id}
                className={`${styles.user} ${styles.userListHeader}`}
              >
                <p>{user._id}</p>
                <p>{user.firstName + " " + user.lastName}</p>
                <p>{user.email}</p>
                <p>{user.phoneNumber}</p>
                <p>{user.orderList.length}</p>
                <DeleteIcon
                  className={styles.icon}
                  onClick={() => deleteHandler(user._id)}
                />
              </li>
              <hr />
            </>
          );
        })}
      </ul>
      {alert.status && <CustomAlert />}
    </div>
  );
}
