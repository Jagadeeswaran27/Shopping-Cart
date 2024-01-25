import Header from "./components/Header";
import Products from "./components/Products";
import { useState } from "react";
import { AppContext } from "./components/Context-File/AppContext";
import Category from "./components/Categories";
import Cart from "./components/Cart";

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
    setCategory((prev) => {
      const newCartItems = Array.isArray(prev.cartItems)
        ? [...prev.cartItems, data]
        : [data];

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
      return {
        ...prev,
        cartItems: prev.cartItems.filter((item) => item.id !== id),
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
          <Cart />
        ) : null}
      </div>
    </AppContext.Provider>
  );
}
