import { useContext } from "react";
import { AppContext } from "./Context-File/AppContext";
import icon from "../assets/icon.png";
import purchasePng from "../assets/purchase.png";

export default function Cart() {
  const { onCloseCart, cartItems, updateCart } = useContext(AppContext);

  const totalPrice = cartItems.reduce((curr, next) => {
    return (curr += next.price);
  }, 0);
  return (
    <div className="cart-container">
      {cartItems.length > 0 ? (
        cartItems.map((item, index) => (
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
                  <button onClick={() => updateCart(item.id)}>Remove</button>
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
        <button onClick={onCloseCart}>close</button>
      </div>
    </div>
  );
}
