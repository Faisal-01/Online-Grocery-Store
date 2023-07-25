import styles from "../styles/Signup.module.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useRef } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from 'next/link';
import Head from "next/head";
import CustomAlert from "@/components/CustomAlert";
import { useAppContext } from "@/context/AppContext";

export default function Signup() {
  const detailsContainer = useRef(null);
  // const paymentContainer = useRef(null);
  const wrapper = useRef(null);
  const successContainer = useRef(null);

  const {alert, setAlert} = useAppContext();

  const personalDetailsRefs = useRef({
    firstNameRef: null,
    lastNameRef: null,
    emailRef: null,
    passwordRef: null,
    confirmPasswordRef: null,
    phoneNumberRef: null,
  });

  const [personalDetails, setPersonalDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  // const [creditCardDetails, setCreditCardDetails] = useState({
  //   holderName: "",
  //   cardNumber: "",
  //   cvv: "",
  //   expireMonth: "",
  //   expireYear: "",
  // });

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validatePhoneNumber = (number) => {
    return String(number)
      
      .match(
        /^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/gm
      );
  };

  // function validateCreditCardNumber(cardNumber) {
  //   var regex =
  //     /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
  //   return regex.test(cardNumber);
  // }

  // function validateCreditCardCVV(cvvCode) {
  //   var regex = /^[0-9]{3,4}$/;
  //   return regex.test(cvvCode);
  // }

  // function submitHandler(e){
  //   e.preventDefault();
    
  //   if(creditCardDetails.holderName.length < 3){
  //     alert("Please Enter valid name")
  //     return
  //   }

  //   if(!validateCreditCardNumber(creditCardDetails.cardNumber)){
  //     alert("Please Enter Valid credit card number")
  //     return
  //   }

  //   if(!validateCreditCardCVV(creditCardDetails.cvv)){
  //     alert("Please Enter Valid CVV number")
  //     return
  //   }

  //   if (creditCardDetails.expireMonth == "--Select Month--") {
  //     alert("Please Select Expire Month");
  //     return;
  //   }

  //   if (creditCardDetails.expireYear == "--Select Year--") {
  //     alert("Please Select Expire Year");
  //     return;
  //   }

  //   successContainer.current.style.display = "flex";
  //   wrapper.current.style.display = "none";

  //   alert("submitted")
  // }

  const createUser = async () => {
    try {
      const {confirmPassword, ...rest} = personalDetails;
      let user = rest;
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/register",
        { user: user }
      );
      
      detailsContainer.current.style.display = "none";
      successContainer.current.style.display = "flex";
      wrapper.current.style.display = "none";

    } catch (error) {
      setAlert({status: true, message: error.response.data})
      console.log(error)
    }
  }

  const detailsValidation = (e) => {
    e.preventDefault()
    if (
      !(
        personalDetails.firstName &&
        personalDetails.lastName &&
        personalDetails.email &&
        personalDetails.password &&
        personalDetails.confirmPassword
      )
    ) {
      
      if (!personalDetails.firstName) {
        personalDetailsRefs.current.firstNameRef.style.backgroundColor =
          "#FF896D";

      } else {
        personalDetailsRefs.current.firstNameRef.style.backgroundColor =
          "white";
      }

      if (!personalDetails.lastName) {
        personalDetailsRefs.current.lastNameRef.style.backgroundColor =
          "#FF896D";
      } else {
        personalDetailsRefs.current.lastNameRef.style.backgroundColor = "white";
      }

      if (!personalDetails.email) {
        personalDetailsRefs.current.emailRef.style.backgroundColor = "#FF896D";
      } else {
        personalDetailsRefs.current.emailRef.style.backgroundColor = "white";
      }

      if (!personalDetails.password) {
        personalDetailsRefs.current.passwordRef.style.backgroundColor =
          "#FF896D";
      } else {
        personalDetailsRefs.current.passwordRef.style.backgroundColor = "white";
      }

      if (!personalDetails.confirmPassword) {
        personalDetailsRefs.current.confirmPasswordRef.style.backgroundColor =
          "#FF896D";
      } else {
        personalDetailsRefs.current.confirmPasswordRef.style.backgroundColor =
          "white";
      }
    } 
    else {
      for (const property in personalDetailsRefs.current) {
        personalDetailsRefs.current[property].style.backgroundColor = "white";
      }

      if (personalDetails.password !== personalDetails.confirmPassword) {
        setAlert({
          status: true,
          message: "Password and confirm password are not same",
        });
        personalDetailsRefs.current.passwordRef.style.backgroundColor =
          "#FF896D";
        personalDetailsRefs.current.confirmPasswordRef.style.backgroundColor =
          "#FF896D";
        return;
      } else {
        personalDetailsRefs.current.passwordRef.style.backgroundColor = "white";
        personalDetailsRefs.current.confirmPasswordRef.style.backgroundColor =
          "white";
      }

      if (!validateEmail(personalDetails.email)) {
        setAlert({
          status: true,
          message: "Email is not valid",
        });
        personalDetailsRefs.current.emailRef.style.backgroundColor = "#FF896D";
        return;
      } else {
        personalDetailsRefs.current.emailRef.style.backgroundColor = "white";
      }

      if (!validatePhoneNumber(personalDetails.phoneNumber)) {
        setAlert({
          status: true,
          message: "Phone number is not valid",
        });
        personalDetailsRefs.current.phoneNumberRef.style.backgroundColor = "#FF896D";
        return;
      } else {
        personalDetailsRefs.current.phoneNumberRef.style.backgroundColor = "white";
      }

      

      createUser();
      // paymentContainer.current.style.display = "flex";
    }

    

  };

  // useEffect(() => {
  //   var yearSelect = document.getElementById("expireYear");
  //   var currentYear = new Date().getFullYear();
  //   for (var i = 0; i <= 10; i++) {
  //     var yearOption = document.createElement("option");
  //     yearOption.value = currentYear + i;
  //     yearOption.text = currentYear + i;
  //     yearSelect.add(yearOption);
  //   }
  // }, []);

  useEffect(() => {
    successContainer.current.style.display = "none"
  } ,[])

  return (
    <>
      <Head>
        <title>Fresh Cart</title>
        <link rel="icon" href="/images/logo.jpeg" />
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={styles.container}>
        <div className={styles.wrapper} ref={wrapper}>
          <h1 className={styles.title}>SIGNUP</h1>

          <h3 className={styles.subtitle}>
            Please provide details to proceed further
          </h3>

          <form className={styles.signupForm} onSubmit={detailsValidation}>
            <div
              // style={{ display: "none" }}
              className={styles.detailsContainer}
              ref={detailsContainer}
            >
              <div className={styles.nameContainer}>
                <div className={styles.firstNameContainer}>
                  <label htmlFor="firstName">First Name*</label>

                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    className={styles.inputs}
                    value={personalDetails.firstName}
                    onChange={(e) =>
                      setPersonalDetails({
                        ...personalDetails,
                        firstName: e.target.value,
                      })
                    }
                    ref={(el) =>
                      (personalDetailsRefs.current.firstNameRef = el)
                    }
                  />
                </div>

                <div className={styles.lastNameContainer}>
                  <label htmlFor="lastName">Last Name*</label>

                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    className={styles.inputs}
                    value={personalDetails.lastName}
                    onChange={(e) =>
                      setPersonalDetails({
                        ...personalDetails,
                        lastName: e.target.value,
                      })
                    }
                    ref={(el) => (personalDetailsRefs.current.lastNameRef = el)}
                  />
                </div>
              </div>

              <div className={styles.emailContainer}>
                <label htmlFor="email">Email*</label>

                <input
                  type="email"
                  name="email"
                  id="email"
                  className={styles.inputs}
                  value={personalDetails.email}
                  onChange={(e) =>
                    setPersonalDetails({
                      ...personalDetails,
                      email: e.target.value,
                    })
                  }
                  ref={(el) => (personalDetailsRefs.current.emailRef = el)}
                />
              </div>

              <div className={styles.passwordContainer}>
                <div className={styles.rawPasswordContainer}>
                  <label htmlFor="password">Password*</label>

                  <input
                    type="text"
                    name="password"
                    id="password"
                    className={styles.inputs}
                    value={personalDetails.password}
                    onChange={(e) =>
                      setPersonalDetails({
                        ...personalDetails,
                        password: e.target.value,
                      })
                    }
                    ref={(el) => (personalDetailsRefs.current.passwordRef = el)}
                  />
                </div>

                <div className={styles.confirmPasswordContainer}>
                  <label htmlFor="confirmPassword"> Confirm Password*</label>

                  <input
                    type="text"
                    name="confirmPassword"
                    id="confirmPassword"
                    className={styles.inputs}
                    value={personalDetails.confirmPassword}
                    onChange={(e) =>
                      setPersonalDetails({
                        ...personalDetails,
                        confirmPassword: e.target.value,
                      })
                    }
                    ref={(el) =>
                      (personalDetailsRefs.current.confirmPasswordRef = el)
                    }
                  />
                </div>
              </div>

              <div className={styles.phoneNumberContainer}>
                <label htmlFor="phoneNumber">Phone Number</label>

                <input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  className={styles.inputs}
                  value={personalDetails.phoneNumber}
                  onChange={(e) =>
                    setPersonalDetails({
                      ...personalDetails,
                      phoneNumber: e.target.value,
                    })
                  }
                  ref={(el) =>
                    (personalDetailsRefs.current.phoneNumberRef = el)
                  }
                />
              </div>

              <button
                type="submit"
                className={styles.nextButtonContainer}
                // onClick={detailsValidation}
              >
                <p className={styles.nextButton}>Submit</p>
                {/* <ArrowForwardIcon className={styles.nextIcon} /> */}
              </button>
            </div>

            {/* <div className={styles.paymentContainer} ref={paymentContainer}>
            <div className={styles.cardHolderNameContainer}>
              <label htmlFor="cardHolderName">Card Holder Name*</label>

              <input
                className={styles.inputs}
                type="text"
                id="cardHolderName"
                value={creditCardDetails.holderName}
                onChange={(e) =>
                  setCreditCardDetails({
                    ...creditCardDetails,
                    holderName: e.target.value,
                  })
                }
              />
            </div>

            <div className={styles.cardContainer}>
              <div className={styles.cardNumberContainer}>
                <label htmlFor="cardNumber">Card Number*</label>
                <input
                  className={styles.inputs}
                  type="number"
                  id="cardNumber"
                  value={creditCardDetails.cardNumber}
                  onChange={(e) =>
                    setCreditCardDetails({
                      ...creditCardDetails,
                      cardNumber: e.target.value,
                    })
                  }
                />
              </div>

              <div className={styles.slashContainer}>
                <RxSlash className={styles.slash} />
              </div>

              <div className={styles.cardCvvContainer}>
                <label htmlFor="cardCvv">CVV*</label>
                <input
                  className={styles.inputs}
                  type="number"
                  id="cardCvv"
                  value={creditCardDetails.cvv}
                  onChange={(e) =>
                    setCreditCardDetails({
                      ...creditCardDetails,
                      cvv: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className={styles.expireContainer}>
              <div className={styles.expireMonthContainer}>
                <label htmlFor="expireMonth">Expire Month*</label>
                <select
                  id="month-select"
                  name="month"
                  className={styles.inputs}
                  onChange={(e) =>
                    setCreditCardDetails({
                      ...creditCardDetails,
                      expireMonth:
                        e.target.options[e.target.selectedIndex].text,
                    })
                  }
                >
                  <option value="">--Select Month--</option>
                  <option value="01">January</option>
                  <option value="02">February</option>
                  <option value="03">March</option>
                  <option value="04">April</option>
                  <option value="05">May</option>
                  <option value="06">June</option>
                  <option value="07">July</option>
                  <option value="08">August</option>
                  <option value="09">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
              </div>

              <div className={styles.expireYearContainer}>
                <label htmlFor="expireYear">Expire Year*</label>
                <select
                  id="expireYear"
                  name="year"
                  className={styles.inputs}
                  onChange={(e) =>
                    setCreditCardDetails({
                      ...creditCardDetails,
                      expireYear: e.target.options[e.target.selectedIndex].text,
                    })
                  }
                >
                  <option value="">--Select Year--</option>
                </select>
              </div>
            </div>

            <div className={styles.buttons}>
              <button
                type="button"
                className={`${styles.skipButton} ${styles.button}`}
              >
                Skip
              </button>
              <button
                type="button"
                className={`${styles.backButton} ${styles.button}`}
                onClick={() => {
                  detailsContainer.current.style.display = "flex";
                  paymentContainer.current.style.display = "none";
                }}
              >
                Back
              </button>
              <button
                type="submit"
                className={`${styles.submitButton} ${styles.button}`}
              >
                Submit
              </button>
            </div>
          </div> */}
          </form>
        </div>

        <div
          ref={successContainer}
          className={`${styles.successContainer} ${styles.wrapper}`}
        >
          <h1>Welcome to Fresh Card</h1>
          <p>
            <Link href="/login">Login</Link> To start shopping
          </p>
        </div>
        {alert.status && <CustomAlert />}
      </div>
    </>
  );
}

Signup.NoLayout = true;
