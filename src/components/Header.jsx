import { useContext } from "react";
import { AppContext } from "./Context-File/AppContext";
import { motion } from "framer-motion";
export default function Header() {
  const { onCartClick, cartItems } = useContext(AppContext);
  const items = cartItems.length;
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
