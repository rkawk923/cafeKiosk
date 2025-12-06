import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Complete.css";

export default function Complete() {
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state;
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => setSeconds((s) => s - 1), 1000);
    if (seconds <= 0) {
      clearInterval(timer);
      navigate("/");
    }
    return () => clearInterval(timer);
  }, [seconds, navigate]);

  if (!orderData) {
    return (
      <div className="complete-page">
        <div className="complete-card">
          <h2>결제 정보 없음</h2>
          <button onClick={() => navigate("/")}>인트로로 이동</button>
        </div>
      </div>
    );
  }

  return (
    <div className="complete-page">
      <div className="complete-card">
        <div className="checkmark">✔</div>
        <h1 className="title">결제가 완료되었습니다</h1>

        <div className="order-info">
          <div>
            <span>주문번호</span>
            <strong>{orderData.orderNo}</strong>
          </div>
          <div>
            <span>카페명</span>
            <strong>{orderData.cafeName}</strong>
          </div>
          <div>
            <span>주문 방식</span>
            <strong>{orderData.orderType}</strong>
          </div>
          <div>
            <span>결제 시간</span>
            <strong>{new Date(orderData.orderTime).toLocaleString()}</strong>
          </div>
        </div>

        <div className="order-summary">
          <h2>주문 내역</h2>
          <ul>
            {orderData.items.map((item) => (
              <li key={item.id}>
                <span className="item-name">
                  {item.name} x {item.qty}
                </span>
                <span className="item-price">
                  {(item.price * item.qty).toLocaleString()}원
                </span>
              </li>
            ))}
          </ul>
          <div className="total">
            총 금액: <strong>{orderData.total.toLocaleString()}원</strong>
          </div>
        </div>

        <p className="redirect-msg">인트로로 자동 이동합니다. ({seconds})</p>
        <button onClick={() => navigate("/")}>지금 이동</button>
      </div>
    </div>
  );
}
