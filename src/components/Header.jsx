import { useContext } from "react";
import { AppContext } from "./Context-File/AppContext";
import { motion } from "framer-motion";
export default function Header() {
  const { onCartClick } = useContext(AppContext);
  const storedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const items = storedItems.length;
  return (
    <header>
      <p>Shopping Cart App</p>
      <span>
        <motion.button
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300, duration: 0.6 }}
          onClick={onCartClick}
        >
          Cart({items})
        </motion.button>
      </span>
    </header>
  );
}
