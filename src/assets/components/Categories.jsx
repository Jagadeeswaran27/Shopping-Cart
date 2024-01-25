import { useContext } from "react";
import { AppContext } from "./Context-File/AppContext";
import { useState, useEffect } from "react";

export default function Category() {
  const { setCurrCategory, activeCategory } = useContext(AppContext);

  const categories = [
    { name: "electronics", state: useState("normal") },
    { name: "jewelery", state: useState("normal") },
    { name: "men's clothing", state: useState("normal") },
    { name: "women's clothing", state: useState("normal") },
  ];

  function onClick(e) {
    setCurrCategory(e);
    categories.forEach((category) => {
      category.state[1]("normal");
    });

    const clickedCategory = categories.find(
      (category) =>
        category.name.toLowerCase() === e.target.innerText.toLowerCase()
    );
    if (clickedCategory) {
      clickedCategory.state[1]("active");
    }
  }

  useEffect(() => {
    categories.forEach((category) => {
      if (category.name.toLowerCase() === activeCategory) {
        category.state[1]("active");
      } else {
        category.state[1]("normal");
      }
    });
  }, [activeCategory]);

  return (
    <div className="category-container">
      {categories.map(({ name, state }) => (
        <button className={state[0]} onClick={onClick} key={name}>
          {name}
        </button>
      ))}
    </div>
  );
}
