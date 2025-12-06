import React from "react";
import "./CartItem.css";
import { useOrder } from "../context/OrderContext";
import { FaRegTrashAlt } from "react-icons/fa";

export default function CartItem({ item }) {
  const { increaseQty, decreaseQty, removeFromCart } = useOrder();

  return (
    <li className="cart-item-wrapper">
      <div className="cart-item-meta">
        <div className="cart-item-name">{item.name}</div>
        <div className="cart-item-price">{item.price.toLocaleString()}원</div>
      </div>
      <div className="cart-item-actions">
        <div className="cart-item-qty-controls">
          <button
            className="qty-btn"
            onClick={() => decreaseQty(item.id)}
            aria-label="감소"
          >
            −
          </button>
          <div className="qty-value">{item.qty}</div>
          <button
            className="qty-btn"
            onClick={() => increaseQty(item.id)}
            aria-label="증가"
          >
            +
          </button>
        </div>
        <button
          className="remove-btn"
          onClick={() => removeFromCart(item.id)}
          aria-label="삭제"
        >
          <FaRegTrashAlt />
        </button>
      </div>
    </li>
  );
}
