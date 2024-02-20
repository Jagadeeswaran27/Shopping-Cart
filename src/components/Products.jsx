import React, { useEffect, useState, useContext } from "react";
import icon from "../assets/icon.png";
import purchasePng from "../assets/purchase.png";
import { AppContext } from "./Context-File/AppContext";
import Spinner from "./LoadingSpinner";
import { motion } from "framer-motion";

export default function Products() {
  const [items, setItems] = useState([]);
  const [fetching, isFetching] = useState(false);
  const { curr, addToCart } = useContext(AppContext);

  const storedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  console.log(storedItems);

  useEffect(() => {
    async function fetchData() {
      try {
        isFetching(true);
        const response = await fetch(
          `https://fakestoreapi.com/products/category/${curr}`
        );
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        isFetching(false);
      }
    }
    fetchData();
  }, [curr]);

  const isItemInCart = (itemId) => {
    return storedItems.some((item) => item.id === itemId);
  };

  return (
    <div className="Products">
      {fetching ? (
        <Spinner />
      ) : (
        <motion.div
          className="product-list"
          transition={{ staggerChildren: 0.1 }}
          initial="hidden"
          animate="visible"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "30px",
          }}
        >
          {items.map((data, index) => (
            <motion.div
              key={index}
              className="Product-Item"
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 50 },
              }}
              style={{ margin: "10px" }} // Adjust flex properties and margins as needed
            >
              <div className="png-container">
                <div>
                  <img className="icon" src={icon} alt="icon" />
                  <p>{data.rating.rate}</p>
                </div>
                <div>
                  <img src={purchasePng} className="icon" alt="purchase icon" />
                  <p>{data.rating.count}</p>
                </div>
              </div>
              <hr />
              <img
                src={data.image}
                alt="product"
                style={{ maxWidth: "100%" }}
              />
              <hr />
              <p>{data.title}</p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, duration: 0.6 }}
                onClick={() => addToCart(data)}
                className="add-Cart"
                disabled={isItemInCart(data.id)}
              >
                {isItemInCart(data.id) ? "Added to Cart" : "Add to Cart"}
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
