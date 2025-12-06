import React from "react";
import "./Header.css";
import { useOrder } from "../context/OrderContext";
import { useNavigate } from "react-router-dom";
import { FaMugHot } from "react-icons/fa";

export default function Header() {
  const { orderType, selectOrderType } = useOrder();
  const navigate = useNavigate();

  const handleChangeType = () => {
    const next =
      orderType === "포장" ? "매장" : orderType === "매장" ? "개인컵" : "포장";
    selectOrderType(next);
  };

  return (
    <header className="header">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
        aria-label="인트로로 이동"
        title="인트로로 이동"
      >
        <FaMugHot size={28} />
        <h1 className="header-title">연암 카페</h1>
      </div>
      <button className="header-type" onClick={handleChangeType}>
        {orderType || "선택"}
      </button>
    </header>
  );
}
