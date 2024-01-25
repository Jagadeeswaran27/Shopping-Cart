import React, { useEffect, useState, useRef } from "react";
import icon from "../../assets/icon.png";
import purchasePng from "../../assets/purchase.png";
import { useContext } from "react";
import { AppContext } from "./Context-File/AppContext";

export default function Products() {
  const [items, setItems] = useState([]);
  const { curr, cartItems, addToCart } = useContext(AppContext);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://fakestoreapi.com/products/category/${curr}`
        );
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [curr]);
  const isItemInCart = (itemId) => {
    return cartItems.some((item) => item.id === itemId);
  };

  return (
    <div className="Products">
      {items.map((data, index) => (
        <div key={index} className="Product-Item">
          <div className="png-container">
            <div>
              <img className="icon" src={icon} />
              <p>{data.rating.rate}</p>
            </div>
            <div>
              <img src={purchasePng} className="icon" />
              <p>{data.rating.count}</p>
            </div>
          </div>
          <hr></hr>
          <img src={data.image} />
          <hr></hr>
          <p>{data.title}</p>
          <button
            onClick={() => addToCart(data)}
            className="add-Cart"
            disabled={isItemInCart(data.id)}
          >
            {isItemInCart(data.id) ? "Added to Cart" : "Add to Cart"}
          </button>
        </div>
      ))}
    </div>
  );
}
