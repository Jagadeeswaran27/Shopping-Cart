import { useContext } from "react";
import { AppContext } from "./Context-File/AppContext";
export default function Header() {
  const { onCartClick, cartItems } = useContext(AppContext);
  const items = cartItems.length;
  return (
    <header>
      <p>Shopping Cart App</p>
      <span>
        <button onClick={onCartClick}>Cart({items})</button>
      </span>
    </header>
  );
}
