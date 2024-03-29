import { useContext } from "react";
import { AppContext } from "./Context-File/AppContext";
import icon from "../assets/icon.png";
import purchasePng from "../assets/purchase.png";
import { motion } from "framer-motion";

export default function Cart() {
  const { onCloseCart, updateCart } = useContext(AppContext);

  const storedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const totalPrice = storedItems.reduce((curr, next) => {
    return (curr += next.price);
  }, 0);
  return (
    <motion.div layout exit={{ y: -30, opacity: 0 }} className="cart-container">
      {storedItems.length > 0 ? (
        storedItems.map((item, index) => (
          <div key={index} className="cart-item">
            <div className="img-container">
              <img src={item.image} />
            </div>
            <div className="cart-desc">
              <div className="text-container">
                <p>{item.title}</p>
              </div>
              <div className="key-desc">
                <div>
                  <img src={purchasePng} className="icon" />
                  <p>{item.rating.count}</p>
                </div>
                <div>
                  <img className="icon" src={icon} />
                  <p>{item.rating.rate}</p>
                </div>
                <div>
                  <p>${item.price}</p>
                </div>
                <div>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      duration: 0.6,
                    }}
                    onClick={() => updateCart(item.id)}
                  >
                    Remove
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="fallback-text">
          <p>No items in the cart</p>
        </div>
      )}
      <div className="cart-footer">
        <span>Total : ${Math.round(totalPrice)}</span>
        <motion.button
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300, duration: 0.6 }}
          onClick={onCloseCart}
        >
          close
        </motion.button>
      </div>
    </motion.div>
  );
}
