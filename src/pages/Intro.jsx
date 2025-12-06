import React from "react";
import { useNavigate } from "react-router-dom";
import { useOrder } from "../context/OrderContext";
import "./Intro.css";

import { FaStore, FaMugHot } from "react-icons/fa";
import { CiCoffeeCup } from "react-icons/ci";

export default function Intro() {
  const navigate = useNavigate();
  const { selectOrderType } = useOrder();

  const goOrder = (type) => {
    selectOrderType(type);
    navigate("/order");
  };

  const goOrderHistory = (type) => {
    selectOrderType(type);
    navigate("/orderHistory");
  };

  return (
    <div className="intro-container">
      <button
        onClick={() => goOrderHistory("내역")}
        className="order-history-btn"
        aria-label="결제 내역"
        title="결제 내역"
      >
        결제 내역
      </button>
      <div className="intro-content">
        <h1 className="intro-title">연암 카페</h1>
        <p className="intro-subtitle">어서오세요 ☕</p>

        <div className="order-type-box">
          <button className="order-btn takeout" onClick={() => goOrder("포장")}>
            <CiCoffeeCup className="order-icon" />
            <span>포장</span>
          </button>

          <button className="order-btn store" onClick={() => goOrder("매장")}>
            <FaStore className="order-icon" />
            <span>매장</span>
          </button>

          <button className="order-btn cup" onClick={() => goOrder("개인컵")}>
            <FaMugHot className="order-icon" />
            <span>개인컵</span>
          </button>
        </div>

        <p className="intro-tip">주문 방식을 선택해주세요</p>
      </div>
    </div>
  );
}
