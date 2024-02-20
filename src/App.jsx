import Header from "./components/Header";
import Products from "./components/Products";
import { useState } from "react";
import { AppContext } from "./components/Context-File/AppContext";
import Category from "./components/Categories";
import Cart from "./components/Cart";
import { AnimatePresence } from "framer-motion";

export default function App() {
  const [category, setCategory] = useState({
    curr: "electronics",
    cartItems: [],
    showCart: false,
    activeCategory: "electronics",
  });

  function setCurrCategory(e) {
    setCategory((prev) => {
      return {
        ...prev,
        curr: e.target.innerText,
        activeCategory: e.target.innerText.toLowerCase(),
      };
    });
  }

  function addToCart(data) {
    const existingItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCategory((prev) => {
      const newCartItems = [...existingItems, data];

      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
      return {
        ...prev,
        cartItems: newCartItems,
      };
    });
  }

  function onCartClick() {
    setCategory((prev) => {
      return {
        ...prev,
        showCart: true,
      };
    });
  }

  function onCloseCart() {
    setCategory((prev) => {
      return {
        ...prev,
        showCart: false,
      };
    });
  }

  function updateCart(id) {
    setCategory((prev) => {
      const storedCartItems =
        JSON.parse(localStorage.getItem("cartItems")) || [];
      const updatedCartItems = storedCartItems.filter((item) => item.id !== id);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      return {
        ...prev,
        cartItems: updatedCartItems,
      };
    });
  }

  const ctxValue = {
    curr: category.curr,
    cartItems: category.cartItems,
    showCart: category.showCart,
    setCurrCategory: setCurrCategory,
    addToCart: addToCart,
    onCartClick: onCartClick,
    onCloseCart: onCloseCart,
    updateCart: updateCart,
    activeCategory: category.activeCategory,
  };

  return (
    <AppContext.Provider value={ctxValue}>
      <div className="main-wrapper">
        <Header />
        {!category.showCart && <Category />}
        {category.curr.length > 0 && !category.showCart ? (
          <Products />
        ) : category.showCart ? (
          <AnimatePresence>
            <Cart />
          </AnimatePresence>
        ) : null}
      </div>
    </AppContext.Provider>
  );
}
