import React from "react";
import "./MenuItem.css";
import { useOrder } from "../context/OrderContext";

import coffeeImg from "../assets/coffee.jpg";
import latteImg from "../assets/cafelatte.jpg";
import greenTeaImg from "../assets/greenTeeLatte.jpg";
import smoothieImg from "../assets/fruitSmoothie.jpg";
import chocoCakeImg from "../assets/chocolateCake.jpg";
import croissantImg from "../assets/Croissant.jpg";
import saladImg from "../assets/Salad.jpg";
import sandwichImg from "../assets/sandwich.jpg";

const getImgId = (imgId) => {
  switch (imgId) {
    case "coffeeImg":
      return coffeeImg;
    case "latteImg":
      return latteImg;
    case "greenTeaImg":
      return greenTeaImg;
    case "smoothieImg":
      return smoothieImg;
    case "chocoCakeImg":
      return chocoCakeImg;
    case "croissantImg":
      return croissantImg;
    case "saladImg":
      return saladImg;
    case "sandwichImg":
      return sandwichImg;
    default:
      return coffeeImg;
  }
};

export default function MenuItem({ product }) {
  const { addToCart } = useOrder();
  const productImg = getImgId(product.img);

  return (
    <article className="product-card" onClick={() => addToCart(product)}>
      <div className="product-img-wrap">
        <img src={productImg} alt={product.name} />
      </div>
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">{product.price.toLocaleString()}원</p>
    </article>
  );
}
