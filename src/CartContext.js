import React, { useState, createContext, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { LoginContext } from "./LoginContext";
export const CartContext = createContext();
export const CartProvider = (props) => {
  const { getEmail } = useContext(LoginContext);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState([0]);
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  //============Cart functions==============//

  const saveCart = () => {
    Axios.post("http://localhost:9000/cart", {
      cart: JSON.stringify(cart),
      username: getEmail(),
    });
    sessionStorage.setItem("cart", JSON.stringify(cart));
  };

  function addToCart(e) {
    const check = cart.every((item) => {
      return item.tree_id !== e.tree_id;
    });
    if (check) {
      setCart([...cart, { ...e }]);
    } else {
      alert(`${e.tree_name} is already in your cart.`);
    }
    console.log(cart);
  }

  const getCart = () => {
    Axios.post("http://localhost:9000/getcart", {
      username: getEmail(),
    }).then((response) => {
      if (response.data.length > 0) {
        setCart(JSON.parse(response.data[0].cart));
      }
    });
  };

  const getTotal = () => {
    const total = [...cart];
    const res = total.reduce((prev, item) => {
      return prev + item.price * item.count;
    }, 0);
    setTotal(res);
  };

  const removeFromCart = (e) => {
    if (window.confirm(`Do you want to remove ${e.name} from your cart?`)) {
      cart.forEach((item, index) => {
        if (item.id === e.id) {
          cart.splice(index, 1);
        }
      });
      setCart(cart);
      getTotal();
    }
  };

  const reduceCount = (id) => {
    const cartUpdater = [...cart];
    cart.forEach((item) => {
      if (item.tree_id === id) {
        item.count === 1 ? (item.count = 1) : (item.count -= 1);
      }
    });
    setCart(cartUpdater);
    getTotal();
  };

  const increaseCount = (id) => {
    const cartUpdater = [...cart];
    cart.forEach((item) => {
      if (item.tree_id === id) {
        item.count += 1;
      }
    });
    setCart(cartUpdater);
    getTotal();
  };

  const resetCart = () => {
    if (window.confirm("Are you sure you want to reset your cart?")) {
      setCart([]);
      getTotal();
    }
  };

  let sum = function (items, prop) {
    return items.reduce(function (a, b) {
      return a + b[prop];
    }, 0);
  };

  function showMessage(arr) {
    return arr.length === 0 ? (
      <div>No items here yet.</div>
    ) : (
      <p>You have {arr.length} items in your cart.</p>
    );
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        reduceCount,
        increaseCount,
        total,
        saveCart,
        setTotal,
        getTotal,
        getCart,
        setCart,
        showSidebar,
        sidebar,
        addToCart,
        removeFromCart,
        sum,
        showMessage,
        resetCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
