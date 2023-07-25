import styles from "../styles/Profile.module.css";
import { useState, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/router";
import axios from "axios";
import CustomAlert from "@/components/CustomAlert";

export default function profile() {
  const { push } = useRouter();

  const { user, alert , setAlert } = useAppContext();

  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const validatePhoneNumber =  (number) => {
    return String(number).match(/^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/gm);
  };
  const updateProfile = async (e) => {
    e.preventDefault();
    if (!userInfo.firstName || !userInfo.lastName || !userInfo.phoneNumber) {
      setAlert({status: true, message: "Please fill all fields"});
      return;
    }
    if (!validatePhoneNumber(userInfo.phoneNumber)) {
      setAlert({status: true, message: "Please provide correct phone number"});
      return;
    }

    try {

      const response = await axios.patch(
        `http://localhost:5000/api/v1/user/${user.id}`,
        { user: userInfo }
      );
      setAlert({status: true, message: "Profile Updated Successfully"})
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      push("/login");
      return;
    }
    console.log(user)
    user &&
      setUserInfo({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
      });
  }, [user]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Profile</h1>

      <form className={styles.detailsContainer} onSubmit={updateProfile}>
        <div className={styles.nameContainer}>
          <div className={styles.firstNameContainer}>
            <label htmlFor="firstName">First Name</label>

            <input
              type="text"
              name="firstName"
              id="firstName"
              className={styles.inputs}
              pattern="^^[a-zA-Z]+$"
              title="First name should only contains characters"
              minLength={3}
              value={userInfo.firstName}
              onChange={(e) =>
                setUserInfo({
                  ...userInfo,
                  firstName: e.target.value,
                })
              }
            />
          </div>

          <div className={styles.lastNameContainer}>
            <label htmlFor="lastName">Last Name</label>

            <input
              type="text"
              name="lastName"
              id="lastName"
              className={styles.inputs}
              value={userInfo.lastName}
              pattern="^[a-zA-Z]+$"
              minLength={3}
              title="Last name should only contains characters"
              onChange={(e) =>
                setUserInfo({
                  ...userInfo,
                  lastName: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className={styles.emailContainer}>
          <label htmlFor="email">Email</label>

          <input
            type="email"
            name="email"
            id="email"
            className={styles.inputs}
            value={userInfo.email}
            disabled
          />
        </div>

        <div className={styles.phoneNumberContainer}>
          <label htmlFor="phoneNumber">Phone Number</label>

          <input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            className={styles.inputs}
            value={userInfo.phoneNumber}
            // pattern="^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/gm"
            // title="Please provide correct phone number e.g +923367966034"
            onChange={(e) =>
              setUserInfo({
                ...userInfo,
                phoneNumber: e.target.value,
              })
            }
          />
        </div>

        <button type="submit" className={styles.nextButtonContainer}>
          <p className={styles.nextButton}>Update</p>
          {/* <ArrowForwardIcon className={styles.nextIcon} /> */}
        </button>
      </form>
      {alert.status && <CustomAlert />}
    </div>
  );
}
