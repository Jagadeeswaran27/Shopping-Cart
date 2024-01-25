import { createContext } from "react";
export const AppContext = createContext({
  curr: "",
  cartItems: [],
  showCart: "",
  setCurrCategory: () => {},
  addToCart: () => {},
  onCartClick: () => {},
  onCloseCart: () => {},
  updateCart: () => {},
});
