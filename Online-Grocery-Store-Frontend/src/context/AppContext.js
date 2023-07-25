import { createContext, useContext, useRef, useState, useEffect } from "react";

const AppContext = createContext(null);

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const navRef = useRef(null);
  const [isCartAlert, setIsCartAlert] = useState({status: false, message: ""});
  const [orderTotal, setOrderTotal] = useState(0);
  const [cartItems, setCartItems] = useState();
  const [deliveryAddress, setDeliveryAddress] = useState({
    address: "",
    show: false,
  });
  const [user, setUser] = useState();
  const [alert, setAlert] = useState({
    status: false,
    message: "",
  });

  
  

  function AddToCartHandler(e, id) {
    e.preventDefault();
    let data = [];

    if (JSON.parse(localStorage.getItem("cart"))) {
      data = JSON.parse(localStorage.getItem("cart"));
      data = [...data, id];
    } else {
      data = [id];
    }

    localStorage.setItem("cart", JSON.stringify(data));
    
    setIsCartAlert({status: true, message: "One item added in cart"});
    e.target.disabled = true;
  }

  return (
    <AppContext.Provider
      value={{ navRef, isCartAlert, setIsCartAlert, AddToCartHandler, orderTotal, setOrderTotal, cartItems, setCartItems, deliveryAddress, setDeliveryAddress, user, setUser, alert, setAlert }}
    >
      {children}
    </AppContext.Provider>
  );
};
